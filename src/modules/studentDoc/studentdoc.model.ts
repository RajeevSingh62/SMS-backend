import mongoose, { Schema, Document } from "mongoose";

export interface IStudentDoc extends Document {
  student: mongoose.Types.ObjectId;  // Student._id
  uploadedBy?: mongoose.Types.ObjectId; // admin/teacher user id who uploaded
  fileUrl: string;
  fileName: string;
  fileType: string;
  size?: number;
  meta?: any;
  tag?: string; // e.g., 'birth-certificate', 'aadhaar', 'photo'
}

const schema = new Schema<IStudentDoc>(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    fileUrl: { type: String, required: true },
    fileName: { type: String },
    fileType: { type: String },
    size: { type: Number },
    meta: { type: Schema.Types.Mixed },
    tag: { type: String },
  },
  { timestamps: true }
);

export const StudentDoc = mongoose.model<IStudentDoc>("StudentDoc", schema);
export default StudentDoc;
