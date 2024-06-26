import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  language: String,
  code: String,
});

export default mongoose.model('SnippetStore', snippetSchema);

