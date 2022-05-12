import { LeanDocument, Types } from "mongoose";
import { IUser } from "../model/user.model";
import Session, {ISession} from "../model/session.model";
import { sign } from "../utils/jwt.utils";
import config from "config";

const createSession = async (userId: Types.ObjectId, userAgent: string) => {
  const session = await Session.create({userId, userAgent});

  return session.toJSON();
}

const createAccessToken = ({
  user,
  session
}: {
  user: 
    | Omit<IUser, 'password'>
    | LeanDocument<Omit<IUser, 'password'>>;
  session:
    | Omit<ISession, 'password'>
    | LeanDocument<Omit<ISession, 'password'>>
   }
): string => {
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
  return accessToken;
}

export { createSession, createAccessToken };