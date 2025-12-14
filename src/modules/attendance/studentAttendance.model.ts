import mongoose, { Schema, model, Document } from "mongoose";

export interface IStudentAttendance extends Document {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  date: Date;
  status: "PRESENT" | "ABSENT" | "LEAVE";
  markedBy: mongoose.Types.ObjectId; 
}

const studentAttendanceSchema = new Schema<IStudentAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
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

export default model<IStudentAttendance>(
  "StudentAttendance",
  studentAttendanceSchema
);
