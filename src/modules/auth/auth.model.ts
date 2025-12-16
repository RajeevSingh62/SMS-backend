import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "teacher" | "student" | "parent"|"staff";

export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRole;
  avatar?:string;
  status: "active" | "inactive";
  lastLogin?: Date;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  password: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["admin", "teacher", "student", "parent","staff"], default: "student" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    avatar:{type:String},
    lastLogin: { type: Date },
    resetPasswordToken: { type: String, default: null, select: false },
    resetPasswordExpires: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

// FIXED: async hook -> no next()
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method
userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
export default User;
