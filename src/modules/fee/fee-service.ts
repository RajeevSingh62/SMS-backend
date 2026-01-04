import { FeeTemplate } from "./fee-template.model";
import { StudentMonthlyFee } from "./student-monthly-fee.model";

// fee.service.ts
export const createMonthlyFeeOnAdmission = async (
  studentId: string,
  classId: string
) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const template = await FeeTemplate.findOne({ classId });
  if (!template) throw new Error("Fee template not found");

  const total = template.monthlyFee;

  return await StudentMonthlyFee.create({
    studentId,
    classId,
    month,
    year,
    baseFee: template.monthlyFee,
    examFee: 0,
    miscFee: 0,
    paidAmount: 0,
    totalAmount: total,
    dueAmount: total,
    status: "PENDING",
  });
};
