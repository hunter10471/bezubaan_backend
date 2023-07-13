import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../entities/pet.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  species: string;
}

export class UpdatePetDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  age: number;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty()
  gender: Gender;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  species: string;
}
