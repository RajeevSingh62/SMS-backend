import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPayment extends Document {
  studentId: Types.ObjectId;
  feeId: Types.ObjectId;

  txnId: string;
  amount: number;

  status: "PENDING" | "SUCCESS" | "FAILED";
  gateway: "PAYU";

  rawResponse: any;
}

const paymentSchema = new Schema<IPayment>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    feeId: {
      type: Schema.Types.ObjectId,
      ref: "StudentMonthlyFee",
      required: true,
    },

    txnId: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    gateway: {
      type: String,
      default: "PAYU",
    },

    rawResponse: {
      type: Schema.Types.Mixed,
      default: {},
    },
    
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", paymentSchema);
