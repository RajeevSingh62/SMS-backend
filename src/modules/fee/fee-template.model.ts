import { Schema, model } from "mongoose";

const feeTemplateSchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      unique: true, // ek class ka ek hi template
    },

    monthlyFee: {
      type: Number,
      required: true,
    },

    examFee: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const FeeTemplate = model("FeeTemplate", feeTemplateSchema);
