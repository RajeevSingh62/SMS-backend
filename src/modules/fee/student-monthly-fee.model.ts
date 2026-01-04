import { Schema, model } from "mongoose";

const studentMonthlyFeeSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },

  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },

  month: { type: Number, required: true },
  year: { type: Number, required: true },

  baseFee: { type: Number, default: 0 },
  examFee: { type: Number, default: 0 },
  miscFee: { type: Number, default: 0 },

  totalAmount: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  dueAmount: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["PENDING", "PARTIAL", "PAID"],
    default: "PENDING",
  },
},{timestamps:true});


// ❗ Prevent duplicate month records
studentMonthlyFeeSchema.index(
  { studentId: 1, month: 1, year: 1 },
  { unique: true }
);

export const StudentMonthlyFee = model(
  "StudentMonthlyFee",
  studentMonthlyFeeSchema
);
