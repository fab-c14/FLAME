import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    testCases: { type: Array, required: true },
    createdBy: { type: String, required: true },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    // solvedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // we can use this later
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
