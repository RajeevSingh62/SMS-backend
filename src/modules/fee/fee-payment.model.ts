import { Schema, model } from "mongoose";

const feePaymentSchema = new Schema(
  {
    studentMonthlyFeeId: {
      type: Schema.Types.ObjectId,
      ref: "StudentMonthlyFee",
      required: true,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["CASH", "UPI", "CARD", "BANK"],
      required: true,
    },

    receiptNo: {
      type: String,
      unique: true,
    },

    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const FeePayment = model("FeePayment", feePaymentSchema);
