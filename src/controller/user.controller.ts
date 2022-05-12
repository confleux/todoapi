import { createUser } from '../service/user.service';
import { Request, Response } from "express";
import { omit } from 'lodash';
import log from "../logger";

const createUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.send(omit(user?.toObject(), "password"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.error(e);
      res.status(409).send(e.message);
    }
  }
};

export { createUserHandler };