import mongoose from "mongoose";

export interface ITask {
  _id: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  text: string,
  project?: string,
  createdAt: Date,
  updatedAt: Date
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    text: { type: String, required: true },
    project: { type: String },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
