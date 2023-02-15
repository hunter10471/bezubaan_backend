import { Document } from 'mongoose';
import { Gender } from '../entities/user.entity';
export interface IUser extends Document {
  readonly username: string;
  readonly email: string;
  readonly gender: Gender;
  readonly password: string;
  readonly avatar: string;
}
