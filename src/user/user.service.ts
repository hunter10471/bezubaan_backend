import {
  CreateUserDto,
  UpdateUserDto,
  GetUserDto,
  DeleteUserDto,
} from './dto/user.dto';
import { IUser } from './interface/user.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async createUser(data: CreateUserDto): Promise<IUser> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.password, salt);
    const newUser = new this.userModel({ ...data, password });
    return await newUser.save();
  }
  async updateUser(data: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findOneAndUpdate(
      { username: data.username },
      data,
      {
        new: true,
      },
    );
    if (!existingUser)
      throw new HttpException(
        `User with id ${data.username} could not be updated.`,
        HttpStatus.NOT_FOUND,
      );
    return existingUser;
  }
  async getUser(data: GetUserDto): Promise<IUser> {
    const user = await this.userModel.findOne({ username: data.username });
    if (!user)
      throw new HttpException(
        'User with the given details not found.',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find();
  }
  async deleteUser(data: DeleteUserDto): Promise<IUser> {
    const deletedUser = await this.userModel.findOneAndDelete({
      username: data.username,
    });
    if (!deletedUser)
      throw new HttpException(
        'User with the given details not found.',
        HttpStatus.NOT_FOUND,
      );
    return deletedUser;
  }
}
