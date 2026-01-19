// payment.controller.ts
import { Request,Response } from "express";
import crypto from "crypto";
import Payment from "./payment.model";
import { ENV } from "../../config/env";
import Student from "../student/student.model";

import { StudentMonthlyFee } from "../fee/student-monthly-fee.model";

export const createPayUOrder = async (req:Request, res:Response) => {
  const { feeId } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user.id ;

  const student = await Student.findOne({ user: userId }).populate("user") as any;
  const fee = await StudentMonthlyFee.findById(feeId);

  if (!fee || !student) {
    return res.status(404).json({ message: "Invalid fee or student" });
  }

  const txnId = `TXN_${Date.now()}`;

  const hashString = `${ENV.PAYU_KEY}|${txnId}|${fee.dueAmount}|School Fee|${student.user.name}|${student.user.email}|||||||||||${ENV.PAYU_SALT}`;

  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  const payment = await Payment.create({
    studentId: student._id,
    feeId: fee._id,
    txnId,
    amount: fee.dueAmount,
  });

  res.json({
    success: true,
    data: {
      key: ENV.PAYU_KEY,
      txnId,
      amount: fee.dueAmount,
      productinfo: "School Fee",
      firstname: student.user.name,
      email: student.user.email,
      surl: `${ENV.BACKEND_URL}/payment/payu/success`,
      furl: `${ENV.BACKEND_URL}/payment/payu/failure`,
      hash,
    },
  });
};
export const payUSuccess = async (req:Request, res:Response) => {
  const { txnid, status, hash } = req.body;

  const payment = await Payment.findOne({ txnId: txnid });
  if (!payment) return res.send("Invalid");

  payment.status = "SUCCESS";
  payment.rawResponse = req.body;
  await payment.save();

  // 🔥 Update fee
  await StudentMonthlyFee.findByIdAndUpdate(payment.feeId, {
    paidAmount: payment.amount,
    dueAmount: 0,
    status: "PAID",
  });

  res.redirect(`${ENV.FRONTEND_URL}/studentdashboard/payment-success`);
};
