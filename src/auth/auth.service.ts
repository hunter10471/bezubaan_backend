import { UserService } from './../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto, SignupUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

  async signup(data: SignupUserDto) {
    try {
      return await this.userService.createUser(data);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(data: LoginUserDto) {
    try {
      const user = await this.userModel
        .findOne({ username: data.username })
        .lean();
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      else {
        const result = await bcrypt.compare(data.password, user.password);
        if (!result)
          throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
        const { password, ...others } = user;
        return others;
      }
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
