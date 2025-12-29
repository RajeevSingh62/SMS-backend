import mongoose, { Schema, Document } from "mongoose";

export type Gender = "male" | "female" | "other";

export interface IStudent extends Document {
  user: mongoose.Types.ObjectId;         // linked User (auth)
  admissionNumber: string;               // unique admission no (auto)
  rollNumber?: string;                   // classroom roll (optional / auto)
  classId?: mongoose.Types.ObjectId;     // ref to Class model
  sectionId?: mongoose.Types.ObjectId;   // ref to Section model
  parents: mongoose.Types.ObjectId[];    // list of Parent.user _id
  dateOfBirth?: string;
  gender?: Gender;
  admissionDate?: string;
  previousSchool?: string;
  address?: string;
  avatar?: string;
  status: "active" | "inactive";
  documentUrl:"string"
  documents?: mongoose.Types.ObjectId[]; // refs to StudentDoc
}

const studentSchema = new Schema<IStudent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    admissionNumber: { type: String, required: true },
    rollNumber: { type: String,  sparse: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class" },
    sectionId: { type: Schema.Types.ObjectId, ref: "Section" },
    parents: [{ type: Schema.Types.ObjectId, ref: "Parent" }],
    dateOfBirth: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    admissionDate: { type: String },
    previousSchool: { type: String },
    address: { type: String },
    avatar: { type: String },
    documentUrl: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    documents: [{ type: Schema.Types.ObjectId, ref: "StudentDoc" }],
  },
  { timestamps: true }
);

/**
 * Simple admissionNumber generator:
 * Format: YYYYMMDD + last 4 of ObjectId (or random) => ensures uniqueness practically.
 * In future you can replace with a counter collection for sequential IDs.
 */
studentSchema.pre<IStudent>("validate", async function () {
  if (!this.admissionNumber) {
    const datePrefix = new Date().toISOString().slice(0,10).replace(/-/g,""); // YYYYMMDD
    const short = (this._id?.toString().slice(-4)) || Math.floor(Math.random()*9000+1000).toString();
    this.admissionNumber = `A${datePrefix}${short}`;
  }
});

export default mongoose.model<IStudent>("Student",studentSchema);
