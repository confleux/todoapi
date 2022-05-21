import mongoose from 'mongoose';

export interface ISession {
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  valid: boolean,
  userAgent: string
}

const SessionSchema: mongoose.Schema = new mongoose.Schema<ISession>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
  },
  { timestamps : true }
);

const Session: mongoose.Model<ISession> = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
