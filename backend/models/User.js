import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  stats: {
    totalRuns: {
      type: Number,
      default: 0,
    },
    successfulRuns: {
      type: Number,
      default: 0,
    },
    failedRuns: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.model('User', UserSchema);
