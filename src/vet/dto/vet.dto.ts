import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { FieldOfStudy, Gender, University } from 'src/common/enums';

export class UpdateVetDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @IsOptional()
  @ApiProperty()
  password: string;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  yearsOfExperience: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  specializations: string[];

  @IsEnum(FieldOfStudy)
  @IsOptional()
  @ApiProperty({ enum: FieldOfStudy })
  fieldOfStudy: FieldOfStudy;

  @IsEnum(University)
  @IsOptional()
  @ApiProperty({ enum: University })
  university: University;

  @IsString()
  @IsOptional()
  @ApiProperty()
  degreeImage: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  licenseImage: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isApproved: boolean;
}
