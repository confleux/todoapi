import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface IUser {
  _id: mongoose.Types.ObjectId,
  email: string,
  name: string,
  password: string
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

UserSchema.method('comparePassword', async function (candidatePassword: string): Promise<boolean> {
  return bcrypt
    .compare(candidatePassword, this.password)
    .catch((e) => false);
});

UserSchema.pre('save', async function(): Promise<void> {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
});

const User = mongoose.model<IUser, UserModel>("User", UserSchema);

export default User;