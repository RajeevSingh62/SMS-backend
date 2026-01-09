import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  eventName: string;
  eventDate: Date; 
  status: "active" | "upcoming" | "inactive";
}

const eventSchema = new Schema<IEvent>(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "upcoming", "inactive"],
      required: true,
    },

    eventDate: {
      type: Date,
      required: true, 
    },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", eventSchema);
