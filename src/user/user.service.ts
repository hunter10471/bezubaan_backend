import { UpdateUserDto } from './dto/user.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { SignupUserDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(data: SignupUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findOne({
        email: data.email,
      });

      if (existingUser) {
        throw new HttpException(
          'User with the following email already exists.',
          HttpStatus.CONFLICT,
        );
      }
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(data.password, salt);
      const newUser = new this.userModel({ ...data, password });
      return await newUser.save();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!existingUser)
        throw new HttpException(
          `User with username ${data.username} was not found.`,
          HttpStatus.NOT_FOUND,
        );
      return existingUser;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user)
        throw new HttpException(
          `User with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      if (users.length === 0) {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndRemove(id);
      if (!deletedUser)
        throw new HttpException(
          `User with id ${id}  not found.`,
          HttpStatus.NOT_FOUND,
        );
      return deletedUser;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
