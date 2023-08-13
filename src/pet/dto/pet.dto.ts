import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/common/enums';

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerId: string;
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
