import { FeeTemplate } from "./fee-template.model";
import { StudentMonthlyFee } from "./student-monthly-fee.model";
import {FeePayment} from "./fee-payment.model";

import { Request, Response } from "express";

import { createMonthlyFeeOnAdmission } from "./fee-service";


export const createFeeTemplate = async (req: Request, res: Response) => {
  try {
    const { classId, monthlyFee, examFee } = req.body;

    if (!classId || !monthlyFee) {
      return res.status(400).json({ message: "classId & monthlyFee required" });
    }

    const template = await FeeTemplate.findOneAndUpdate(
      { classId },
      {
        monthlyFee,
        examFee,
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Fee template saved",
      data: template,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const getFeeTemplateByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const template = await FeeTemplate.findOne({ classId }).populate("classId");

    if (!template) {
      return res.status(404).json({ message: "Fee template not found" });
    }

    res.json({ success: true, data: template });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createStudentMonthlyFee = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId, classId } = req.body;

    const fee = await createMonthlyFeeOnAdmission(studentId, classId);

    res.status(201).json({
      success: true,
      data: fee,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const addExamFee = async (req:Request, res:Response) => {
  const { classId, month, year } = req.body;

  const template = await FeeTemplate.findOne({ classId });
  if (!template || !template.examFee) {
    return res.status(400).json({ message: "Exam fee not set" });
  }

  const fees = await StudentMonthlyFee.find({
    classId,
    month,
    year,
  });

  for (const fee of fees) {
    fee.examFee += template.examFee;
    fee.totalAmount += template.examFee;
    fee.dueAmount += template.examFee;
    await fee.save();
  }

  res.json({ success: true, message: "Exam fee added" });
};
export const addMiscFee = async (req:Request, res:Response) => {
  const { studentId, month, year, amount, reason } = req.body;

  const fee = await StudentMonthlyFee.findOne({ studentId, month, year });
  if (!fee) return res.status(404).json({ message: "Fee record not found" });

  fee.miscFee += amount;
  fee.totalAmount += amount;
  fee.dueAmount += amount;

  await fee.save();

  res.json({
    success: true,
    message: `Misc fee added: ${reason}`,
  });
};


export const payFee = async (req:Request, res:Response) => {
  const { studentMonthlyFeeId, amount, paymentMode } = req.body;

  const fee = await StudentMonthlyFee.findById(studentMonthlyFeeId);
  if (!fee) return res.status(404).json({ message: "Fee record not found" });

  if (amount > fee.dueAmount)
    return res.status(400).json({ message: "Extra payment not allowed" });

  fee.paidAmount += amount;
  fee.dueAmount -= amount;

  fee.status =
    fee.dueAmount === 0 ? "PAID" : "PARTIAL";

  await fee.save();

  await FeePayment.create({
    studentMonthlyFeeId: fee._id,
    studentId: fee.studentId,
    amount,
    paymentMode,
    receiptNo: `REC-${Date.now()}`,
  });

  res.json({ success: true, message: "Payment successful" });
};
// fee.controller.ts
export const getStudentFees = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const fees = await StudentMonthlyFee.find({
      studentId: studentId,
    })
      .populate("classId")
      .sort({ year: -1, month: -1 });

    res.json({
      success: true,
      data: fees,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

