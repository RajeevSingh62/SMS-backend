import mongoose, { Schema, model, Document } from "mongoose";

export interface ISection extends Document {
  name: string;
    classId: mongoose.Types.ObjectId;
    capacity:string;

}

const sectionSchema = new Schema<ISection>(
  {
    name: { type: String, required: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    capacity:{type:String}

  },
  { timestamps: true }
);

export default model<ISection>("Section", sectionSchema);
