import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FieldOfStudy, Gender, University } from 'src/common/enums';
import { Location } from 'src/common/entities/location.entity';
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
  @ApiProperty()
  yearsOfExperience: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  specializations: string[];

  @IsString()
  @ApiProperty()
  fieldOfStudy: string;

  @IsEnum(University)
  @ApiProperty({ enum: University })
  university: University;

  @IsString()
  @ApiProperty()
  degreeImage: string;

  @IsString()
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
