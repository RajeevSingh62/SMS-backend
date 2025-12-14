import mongoose, { Schema, model, Document } from "mongoose";

export interface IStaffAttendance extends Document {
  staffId:mongoose.Types.ObjectId;
  date: Date;
  status: "PRESENT" | "ABSENT" | "LEAVE";
  markedBy: mongoose.Types.ObjectId;
}

const staffAttendanceSchema = new Schema<IStaffAttendance>(
  {
    staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LEAVE"],
      required: true,
    },
    markedBy: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
  },
  { timestamps: true }
);

export default model<IStaffAttendance>(
  "StaffAttendance",
  staffAttendanceSchema
);
