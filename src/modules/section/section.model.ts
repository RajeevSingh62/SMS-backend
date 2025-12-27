import mongoose, { Schema, model, Document } from "mongoose";

export interface ISection extends Document {
  name: string;
    classId: mongoose.Types.ObjectId;

}

const sectionSchema = new Schema<ISection>(
  {
    name: { type: String, required: true },
    classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },

  },
  { timestamps: true }
);

export default model<ISection>("Section", sectionSchema);
