import { Schema, model, Document } from "mongoose";

export interface IClass extends Document {
  name: string;

}

const classSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },

  },
  { timestamps: true }
);

export default model<IClass>("Class", classSchema);
