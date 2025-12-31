export interface IParent extends Document {
  user: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId[];
  occupation: string;
  contactNumber: string;
  address: string;
  role: string;
}

const parentSchema = new Schema<IParent>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    role: { type: String, default: "parent" },

    // 🔥 FIX HERE
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student"
      }
    ],

    occupation: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IParent>("Parent", parentSchema);
