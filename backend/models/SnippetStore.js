import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  submittedBy:{
    type:String,
  },
  questionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Question',
  },
  language: String,
  code: String,
});

export default mongoose.model('SnippetStore', snippetSchema);

