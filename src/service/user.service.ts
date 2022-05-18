import {HydratedDocument, LeanDocument, FilterQuery} from 'mongoose';
import User, {IUser, IUserMethods} from "../model/user.model";
import {omit} from 'lodash';
import {query} from "express";

const createUser = async (input: IUser): Promise<HydratedDocument<IUser> | undefined> => {
  try {
    return await User.create(input);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
  }
}

const validate = async (
  {
    email,
    password
  }: {
    email: IUser["email"],
    password: IUser["password"]
  }
): Promise<    Omit<IUser, 'password'>
| LeanDocument<Omit<IUser, 'password'>> | boolean
> => {
  const user = await User.findOne({email});

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  } else {
    return omit(user.toObject(), 'password');
  }
}

const findUser = (query: FilterQuery<IUser>) => {
  return User.findOne(query).lean();
}

export { createUser, validate, findUser };
