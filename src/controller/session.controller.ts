import { Request, Response } from "express";
import { validate } from '../service/user.service';
import { createAccessToken, createSession } from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import config from "config";
import log from "../logger";

const createUserSessionHandler = async (req: Request, res: Response): Promise<void> => {
  const user = await validate(req.body);

  if (typeof user === 'boolean' && !user) {
    res.status(401).send("Invalid email or password");
    return;
  }

  if (typeof user === 'object') {
    const session = await createSession(user._id, req.get('user-agent') || "");

    const accessToken = createAccessToken({ user, session });

    const refreshToken = sign(session, {
      expiresIn: config.get("refreshTokenTtl")
    });

    res.send({ accessToken, refreshToken });
  }


}

export { createUserSessionHandler };