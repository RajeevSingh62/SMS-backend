import { Schema, model, Document } from "mongoose";

export interface IStaff extends Document {
  name: string;
  email: string;
  phone: string;
  avatar:string;
  role: "TEACHER" | "ACCOUNTANT" | "ADMIN" | "OTHER";
  qualification: string;
  joinDate: Date;
}

const staffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["TEACHER", "ACCOUNTANT", "ADMIN", "staff"],
      required: true,
    },
    avatar: { type: String, required: true },
    qualification: { type: String },
    joinDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IStaff>("Staff", staffSchema);
