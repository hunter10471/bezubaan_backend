import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Gender } from 'src/pet/entities/pet.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FieldOfStudy, University } from 'src/common/enums';

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;
}

export class SignUpVetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  yearsOfExperience: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  specializations: string[];

  @IsEnum(FieldOfStudy)
  @IsNotEmpty()
  @ApiProperty({ enum: FieldOfStudy })
  fieldOfStudy: FieldOfStudy;

  @IsEnum(University)
  @IsNotEmpty()
  @ApiProperty({ enum: University })
  university: University;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  degreeImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  licenseImage: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
