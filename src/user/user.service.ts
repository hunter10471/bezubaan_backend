import {
  CreateUserDto,
  UpdateUserDto,
  GetUserDto,
  DeleteUserDto,
} from './dto/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(data: CreateUserDto): Promise<User | HttpException> {
    try {
      const existingUser = await this.userModel.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });
      if (existingUser) {
        return new HttpException(
          'User with the following email or username already exists.',
          HttpStatus.CONFLICT,
        );
      }
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(data.password, salt);
      const newUser = new this.userModel({ ...data, password });
      return await newUser.save();
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(data: UpdateUserDto): Promise<User | HttpException> {
    try {
      const existingUser = await this.userModel.findOneAndUpdate(
        { username: data.username },
        data,
        {
          new: true,
        },
      );
      if (!existingUser)
        throw new HttpException(
          `User with username ${data.username} was not found.`,
          HttpStatus.NOT_FOUND,
        );
      return existingUser;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(data: GetUserDto): Promise<User | HttpException> {
    try {
      const user = await this.userModel.findOne({ username: data.username });
      if (!user)
        throw new HttpException(
          `User with username ${data.username} not found.`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsers(): Promise<User[] | HttpException> {
    try {
      const users = await this.userModel.find();
      if (users.length === 0) {
        return new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(data: DeleteUserDto): Promise<User | HttpException> {
    try {
      const deletedUser = await this.userModel.findOneAndDelete({
        username: data.username,
      });
      if (!deletedUser)
        throw new HttpException(
          `User with username ${data.username}  not found.`,
          HttpStatus.NOT_FOUND,
        );
      return deletedUser;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
