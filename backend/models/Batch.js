import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: String,
    ref: "User",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Batch", BatchSchema);
