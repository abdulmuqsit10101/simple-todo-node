import mongoose from 'mongoose';

interface CallDocument extends mongoose.Document {
  from: String;
  to: String;
  transcript: Object;
  duration: Number;
  ttsDuration: Number;
  sttDuration: Number;
  llmTokens: Number;
  recording: String;
  startTime: Date;
  endTime: Date;
  medium: String;
  userId: mongoose.Schema.Types.ObjectId;
}

const callSchema = new mongoose.Schema<CallDocument>({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  transcript: {
    type: Object,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  ttsDuration: {
    type: Number,
    required: true,
  },
  sttDuration: {
    type: Number,
    required: true,
  },
  llmTokens: {
    type: String,
    required: true,
  },
  recording: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Call = mongoose.model<CallDocument>('Call', callSchema);

export default Call;
