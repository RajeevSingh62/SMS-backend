import { Request, Response } from "express";
import {
    detectIntent,
    detectLanguage,
    explainData,
    extractClassName,
} from "./ai.service";
import studentModel from "../student/student.model";
import { StudentMonthlyFee } from "../fee/student-monthly-fee.model";
import { FeeTemplate } from "../fee/fee-template.model";


export const aiChatController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ reply: "Unauthorized" });
    }

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const intent = await detectIntent(message);
    const language = await detectLanguage(message);

    switch (intent) {

      // ================= STUDENT / PARENT =================
      case "MY_FEE_STATUS": {
        if (!["student", "parent"].includes(user.role)) {
          return res.json({
            intent,
            reply: "Only students or parents can access this info.",
          });
        }

        const student = await studentModel.findOne({ user: user.id });
        if (!student) {
          return res.json({ intent, reply: "Student profile not found." });
        }

        const fee = await StudentMonthlyFee.findOne({
          studentId: student._id,
        }).sort({ year: -1, month: -1 });

        if (!fee) {
          return res.json({ intent, reply: "No fee record found." });
        }

        const reply = await explainData(
          `
Total: ${fee.totalAmount}
Paid: ${fee.paidAmount}
Due: ${fee.dueAmount}
Status: ${fee.status}
`,
          language
        );

        return res.json({ intent, reply });
      }

      // ================= ADMIN =================
      case "CLASS_FEE_INFO": {
        if (user.role !== "admin") {
          return res.json({
            intent,
            reply: "This information is only for admin.",
          });
        }

        const className = await extractClassName(message);
        if (!className) {
          return res.json({
            intent,
            reply: "Please specify the class (example: Class 5).",
          });
        }

        const classFee = await FeeTemplate.findOne({ className });
        if (!classFee) {
          return res.json({
            intent,
            reply: `No fee structure found for Class ${className}.`,
          });
        }

        const reply = await explainData(
          `
Class: ${className}
Monthly Fee: ${classFee.monthlyFee}
Exam Fee: ${classFee.examFee}
`,
          language
        );

        return res.json({ intent, reply });
      }

      // ================= COMMON =================
      case "SCHOOL_INFO":
        return res.json({
          intent,
          reply: "School timing is 8:00 AM to 2:00 PM, Monday to Friday.",
        });

      default:
        return res.json({
          intent: "UNKNOWN",
          reply: "Please ask about fees or class information.",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "AI processing failed" });
  }
};
