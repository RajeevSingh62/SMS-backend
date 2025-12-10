import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId;     // linked User
  rollNumber: string;
  class: string;
  section: string;
  dateOfBirth: string;
  admissionDate: string;
  parentName: string;
  parentPhone: string;
  address: string;
  role:string;
}

const studentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    rollNumber: { type: String, required: true, unique: true },
    class: { type: String, required: true },
    section: { type: String, required: true },

    dateOfBirth: { type: String, required: true },
    admissionDate: { type: String, required: true },

    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },

    address: { type: String, required: true },
    role:{type:String,default:'student'}
  },
  { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
