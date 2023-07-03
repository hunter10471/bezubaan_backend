import { UserService } from './../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto, SignUpVetDto, SignupUserDto } from './dto/auth.dto';
import { UserType } from 'src/common/enums';
import { Vet } from 'src/vet/entities/vet.entity';
import { VetService } from 'src/vet/vet.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly userService: UserService,
    @InjectModel('Vet') private vetModel: Model<Vet>,
    private readonly vetService: VetService,
  ) {}

  async signup(data: SignupUserDto | SignUpVetDto, userType: UserType) {
    try {
      if (userType === UserType.USER) {
        return await this.userService.createUser(data as SignupUserDto);
      }
      if (userType === UserType.VET) {
        return await this.vetService.createVet(data as SignUpVetDto);
      }
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(data: LoginUserDto, userType: UserType) {
    try {
      const user =
        userType === UserType.USER
          ? await this.userModel.findOne({ email: data.email }).lean()
          : await this.vetModel.findOne({ email: data.email }).lean();
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
