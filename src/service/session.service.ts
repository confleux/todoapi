import {FilterQuery, LeanDocument, Types, UpdateQuery } from "mongoose";
import { IUser } from "../model/user.model";
import Session, {ISession} from "../model/session.model";
import { get, omit } from "lodash";
import { sign, decode } from "../utils/jwt.utils";
import config from "config";
import { findUser } from "./user.service";

const createSession = async (userId: Types.ObjectId, userAgent: string) => {
  const session = await Session.create({userId, userAgent});

  return session.toJSON();
}

const createAccessToken = ({
  user,
  session
}: {
  user: 
    | Omit<IUser, "password">
    | LeanDocument<Omit<IUser, "password">>;
  session:
    | Omit<ISession, "password">
    | LeanDocument<Omit<ISession, "password">>
   }
): string => {
  const accessToken = sign(
    { ...omit(user, "password"), session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
  return accessToken;
}

const reIssueAccessToken = async (refreshToken: string): Promise<string | boolean> => {
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) {
    return false;
  }

  const session = await Session.findById(get(decoded, "_id"));

  if (!session || !session?.valid) {
    return false;
  }

  const user = await findUser({ _id: session.userId });

  if (!user) {
    return false;
  }

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

const updateSession = async (query: FilterQuery<ISession>, update: UpdateQuery<ISession>): Promise<void> => {
  await Session.updateOne(query, update);
  return;
}

const findSessions = async (query: FilterQuery<ISession>): Promise<ISession[]> => {
  return Session.find(query).lean();
}

export { createSession, createAccessToken, reIssueAccessToken, updateSession, findSessions };