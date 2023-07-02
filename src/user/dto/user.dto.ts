import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
