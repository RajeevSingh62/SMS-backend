
import studentModel from "../student/student.model";
import { FeeTemplate } from "./fee-template.model";
import { StudentMonthlyFee } from "./student-monthly-fee.model";

export const generateMonthlyFees = async () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();




  console.log(`📅 Generating fees for ${month}/${year}`);

  const students = await studentModel.find({ status: "active" });

  for (const student of students) {
    const alreadyExists = await StudentMonthlyFee.findOne({
      studentId: student._id,
      month,
      year,
    });

    if (alreadyExists) continue;

    const template = await FeeTemplate.findOne({
      classId: student.classId,
    });

    if (!template) continue;

    await StudentMonthlyFee.create({
      studentId: student._id,
      classId: student.classId,
      month,
      year,
      baseFee: template.monthlyFee,
      examFee: 0,
      miscFee: 0,
      totalAmount: template.monthlyFee,
      paidAmount: 0,
      dueAmount: template.monthlyFee,
      status: "PENDING",
    });
  }

  console.log("✅ Monthly fee generation completed");
};
