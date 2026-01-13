// attendance.model.ts
import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
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

export default mongoose.model("Attendance", attendanceSchema);
