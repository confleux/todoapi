import { HydratedDocument, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import Task, { ITask} from "../model/task.model";

const createTask = async (input: ITask): Promise<HydratedDocument<ITask> | undefined> => {
  try {
    return await Task.create(input)
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
  }
}

const findTask = async (query: FilterQuery<ITask>): Promise<ITask> => {
  return Task.findOne(query).lean();
}

const deleteTask = async (query: FilterQuery<ITask>): Promise<ITask> => {
  return Task.deleteOne(query).lean();
}

const updateTask = async (query: FilterQuery<ITask>, update: UpdateQuery<ITask>, options: QueryOptions): Promise<ITask> => {
  return Task.findOneAndUpdate(query, update, options).lean();
}

export { createTask, findTask, deleteTask, updateTask };