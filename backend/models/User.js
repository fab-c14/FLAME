import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
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
      required: true,
    },
    batches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
    }],
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
      solvedQuestions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
      }]
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
