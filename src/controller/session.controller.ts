import { Request, Response } from "express";
import { validate } from "../service/user.service";
import { createAccessToken, createSession } from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import config from "config";
import { get } from "lodash";
import { updateSession, findSessions } from "../service/session.service";

const createUserSessionHandler = async (req: Request, res: Response): Promise<void | Response> => {
  const user = await validate(req.body);

  if (typeof user === "boolean" && !user) {
    res.status(401).send("Invalid email or password");
    return;
  }

  if (typeof user === "object") {
    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = createAccessToken({ user, session });

    const refreshToken = sign(session, {
      expiresIn: config.get("refreshTokenTtl")
    });

    return res.send({ accessToken, refreshToken });
  }
}

const getUserSessionsHandler = async (req: Request, res: Response): Promise<Response | void> => {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true })

  return res.send(sessions);
}

const invalidateUserSessionHandler = async (req: Request, res: Response): Promise<Response> => {
  const sessionId = get(req, "user.session");
  await updateSession({ _id: sessionId}, { valid: false });
  return res.sendStatus(200);
}

export { createUserSessionHandler, getUserSessionsHandler, invalidateUserSessionHandler };