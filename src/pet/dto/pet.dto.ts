import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Gender } from '../entities/pet.entity';
import { ObjectId } from 'mongoose';
export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: Gender;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsOptional()
  readonly species: string;
}

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GetPetDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeletePetDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
