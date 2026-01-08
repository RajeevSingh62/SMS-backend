import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  eventName: string;
   eventDate: string;
   status: "active" | "upcoming" | "inactive";
}

const eventSchema = new Schema<IEvent>(
  {
    eventName: { type: String, required: true },
  
    status: {
      type: String,
      enum: ["active","upcoming","inactive"],
      required: true,
    },
   
    eventDate: { type: String},
  },
  { timestamps: true }
);

export default model<IEvent>("Event", eventSchema);
