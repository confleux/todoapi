import { createTask } from "../service/task.service";
import { Request, Response } from "express";
import log from '../logger/index';

const createTaskHandler = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const task = await createTask(req.body);
    return res.send(task?.toObject());
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.error(e);
      return res.status(408).send(e.message);
    }
  }
}

export { createTaskHandler };