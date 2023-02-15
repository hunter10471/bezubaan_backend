import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: Gender;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class DeleteUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
