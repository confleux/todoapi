import { Types} from "mongoose";
import { createTask, findTask, deleteTask, updateTask } from "../service/task.service";
import { Request, Response } from "express";
import log from '../logger/index';
import { get, assign } from 'lodash';

const createTaskHandler = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const user = get(req, "user");
    req.body.userId = user._id;
    const task = await createTask(req.body);
    return res.send(task?.toObject());
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.error(e);
      return res.status(408).send(e.message);
    }
  }
}

const getTaskHandler = async (req: Request, res: Response): Promise<void | Response> => {
  const taskId = get(req, "params.taskId");
  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).send("Task id is not valid");
  }

  const user = get(req, "user")
  const task = await findTask({ _id: taskId, userId: user._id });

  if (!task) {
    return res.sendStatus(404);
  }

  return res.send(task);
}

const deleteTaskHandler = async (req: Request, res: Response): Promise<void | Response> => {
  const taskId = get(req, "params.taskId");

  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).send("Task id is not valid");
  }

  const user = get(req, "user");

  const task  = await findTask({ _id: taskId, userId: user._id});

  if (!task) {
    return res.sendStatus(404);
  }

  await deleteTask({ _id: taskId, userId: user._id });

  return res.sendStatus(200);
}

const updateTaskHandler = async (req: Request, res: Response): Promise<void | Response> => {
  const taskId = get(req, "params.taskId");

  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).send("Task id is not valid");
  }

  const user = get(req, "user");

  const task  = await findTask({ _id: taskId, userId: user._id});

  if (!task) {
    return res.sendStatus(404);
  }

  const updatedTask = await updateTask({ _id: taskId, userId: user._id }, req.body, { new: true });

  return res.send(updatedTask);
}

export { createTaskHandler, getTaskHandler, deleteTaskHandler, updateTaskHandler };