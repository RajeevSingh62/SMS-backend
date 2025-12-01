import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
  email: string;
  password: string;
  role: "admin" | "teacher" | "student" | "parent";
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

const AccountSchema = new Schema<IAccount>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin","teacher","student","parent"], default: "student" },
  firstName: String,
  lastName: String,
}, { timestamps: true });

export default model<IAccount>("Account", AccountSchema);
