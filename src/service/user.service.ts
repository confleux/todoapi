import { DocumentDefinition } from 'mongoose';
import User, { IUser } from "../model/user.model";

const createUser = async (input: DocumentDefinition<IUser>) => {
  try {
    return await User.create(input);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
  }
}

export { createUser };
