import mongoose from 'mongoose';
import { Types } from 'mongoose';

export interface ISession {
  _id: Types.ObjectId
  userId: Types.ObjectId,
  valid: boolean,
  userAgent: string
}

const SessionSchema: mongoose.Schema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
  },
  { timestamps : true }
);

const Session: mongoose.Model<ISession> = mongoose.model<ISession>("Session", SessionSchema);

export default Session;
