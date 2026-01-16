import mongoose, { Schema, Document, Types } from "mongoose";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEAVE";

export interface IAttendanceRecord {
  studentId: Types.ObjectId;
  status: AttendanceStatus;
}

export interface IAttendance extends Document {
  date: string; // YYYY-MM-DD
  classId: Types.ObjectId;
  sectionId: Types.ObjectId;
  records: IAttendanceRecord[];
  markedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    date: { type: String, required: true }, // YYYY-MM-DD

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    records: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["PRESENT", "ABSENT", "LATE", "LEAVE"],
          required: true,
        },
      },
    ],

    markedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ❗ One attendance per class-section-date
attendanceSchema.index(
  { date: 1, classId: 1, sectionId: 1 },
  { unique: true }
);

export const Attendance = mongoose.model<IAttendance>(
  "Attendance",
  attendanceSchema
);

export default Attendance;
