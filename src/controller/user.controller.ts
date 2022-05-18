import { createUser } from '../service/user.service';
import { Request, Response } from "express";
import { omit } from 'lodash';
import log from "../logger";

const createUserHandler = async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user?.toObject(), "password"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.error(e);
      return res.status(409).send(e.message);
    }
  }
};

export { createUserHandler };