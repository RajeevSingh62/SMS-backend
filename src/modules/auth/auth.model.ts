/**
 * User schema for Auth
 * - bcrypt: password hashing
 * - role: RBAC (admin/teacher/student/parent)
 * - reset token fields for password reset flow
 */

import bcrypt from "bcryptjs";
import mongoose,{Schema,Document} from "mongoose";

export type UserRole = "admin" | "teacher" | "student" | "parent";
export interface IUser extends Document{
  name:string;
  email:string;
 
  role:UserRole;
  status:"active"|"inactive";
  lastLogin?:Date;
  resetPasswordToken?:string |null;
  resetPasswordExpire?:Date|null;
  password:string;
  comparePassword(enteredPassword:string):Promise<boolean>;
    resetPasswordExpires: { type: Date, default: null, select: false },
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["admin", "teacher", "student", "parent"], default: "student" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    lastLogin: { type: Date },
    resetPasswordToken: { type: String, default: null, select: false },
    resetPasswordExpires: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

// Hash password before save (only when modified)
userSchema.pre("save", async function (next) {
  // `this` is the document
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = function (candidate: string) {
  // note: password field is select: false by default, so when using this ensure you queried password
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
export default User;