// payment.controller.ts
import { Request,Response } from "express";
import crypto from "crypto";
import Payment from "./payment.model";
import { ENV } from "../../config/env";


import { StudentMonthlyFee } from "../fee/student-monthly-fee.model";
import studentModel from "../student/student.model";
export const createPayUOrder = async (req: Request, res: Response) => {
  const { feeId, studentId } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const fee = await StudentMonthlyFee.findById(feeId);
  if (!fee) return res.status(404).json({ message: "Invalid fee" });

  let student;

  // ✅ If admin is paying, studentId is required
  if (req.user.role === "admin") {
    if (!studentId) {
      return res.status(400).json({ message: "studentId is required for admin payment" });
    }

    student = await studentModel.findById(studentId).populate("user");
  } 
  // ✅ If student is paying, use logged in userId
  else if (req.user.role === "student") {
    student = await studentModel.findOne({ user: req.user.id }).populate("user");
  } 
  else {
    return res.status(403).json({ message: "Not allowed to create payment" });
  }

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const txnId = `TXN_${Date.now()}`;

  const hashString = `${ENV.PAYU_KEY}|${txnId}|${fee.dueAmount}|School Fee|${(student as any).user.name}|${(student as any).user.email}|||||||||||${ENV.PAYU_SALT}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

  // ✅ store who initiated payment
  const payment = await Payment.create({
    studentId: student._id,
    feeId: fee._id,
    txnId,
    amount: fee.dueAmount,
    status: "PENDING",
    gateway: "PAYU",
    rawResponse: {},
    // initiatedBy: req.user.id,  
  });

  res.json({
    success: true,
    data: {
      key: ENV.PAYU_KEY,
      txnId,
      amount: fee.dueAmount,
      productinfo: "School Fee",
      firstname: (student as any).user.name,
      email: (student as any).user.email,
      surl: `${ENV.BACKEND_URL}/payment/payu/success`,
      furl: `${ENV.BACKEND_URL}/payment/payu/failure`,
      hash,
    },
  });
};

// export const createPayUOrder = async (req:Request, res:Response) => {
//   const { feeId } = req.body;
//   if (!req.user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   const userId = req.user.id ;

//   const student = await Student.findOne({ user: userId }).populate("user") as any;
//   const fee = await StudentMonthlyFee.findById(feeId);

//   if (!fee || !student) {
//     return res.status(404).json({ message: "Invalid fee or student" });
//   }

//   const txnId = `TXN_${Date.now()}`;

//   const hashString = `${ENV.PAYU_KEY}|${txnId}|${fee.dueAmount}|School Fee|${student.user.name}|${student.user.email}|||||||||||${ENV.PAYU_SALT}`;

//   const hash = crypto.createHash("sha512").update(hashString).digest("hex");

//   const payment = await Payment.create({
//     studentId: student._id,
//     feeId: fee._id,
//     txnId,
//     amount: fee.dueAmount,
//   });

//   res.json({
//     success: true,
//     data: {
//       key: ENV.PAYU_KEY,
//       txnId,
//       amount: fee.dueAmount,
//       productinfo: "School Fee",
//       firstname: student.user.name,
//       email: student.user.email,
//       surl: `${ENV.BACKEND_URL}/payment/payu/success`,
//       furl: `${ENV.BACKEND_URL}/payment/payu/failure`,
//       hash,
//     },
//   });
// };
// export const payUSuccess = async (req:Request, res:Response) => {
//   const { txnid, status, hash } = req.body;

//   const payment = await Payment.findOne({ txnId: txnid });
//   if (!payment) return res.send("Invalid");

//   payment.status = "SUCCESS";
//   payment.rawResponse = req.body;
//   await payment.save();

//   // 🔥 Update fee
//   await StudentMonthlyFee.findByIdAndUpdate(payment.feeId, {
//     paidAmount: payment.amount,
//     dueAmount: 0,
//     status: "PAID",
//   });

//   res.redirect(`${ENV.FRONTEND_URL}/studentdashboard/payment-success`);
// };
export const payUSuccess = async (req: Request, res: Response) => {
  const { txnid } = req.body;

  const payment = await Payment.findOne({ txnId: txnid });
  if (!payment) return res.send("Invalid");

  payment.status = "SUCCESS";
  payment.rawResponse = req.body;
  await payment.save();

  // ✅ Always use payment.amount, not req.body.amount
  await StudentMonthlyFee.findByIdAndUpdate(payment.feeId, {
    $inc: { paidAmount: payment.amount },
    $set: { dueAmount: 0, status: "PAID" },
  });

  res.redirect(`${ENV.FRONTEND_URL}/payment-success`);
};
export const payUFailure = async (req: Request, res: Response) => {
  const { txnid } = req.body;

  const payment = await Payment.findOne({ txnId: txnid });

  if (payment) {
    payment.status = "FAILED";
    payment.rawResponse = req.body;
    await payment.save();
  }

  // ✅ redirect frontend failure page
  return res.redirect(`${ENV.FRONTEND_URL}/payment-failure`);
};
