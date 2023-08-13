import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type as TypeTransformer } from 'class-transformer';
import { PaymentStatus, Status, Type } from 'src/common/enums';

export class CreateAppointmentDto {
  @IsDate()
  @TypeTransformer(() => Date)
  @IsNotEmpty()
  @ApiProperty()
  appointmentDate: Date;

  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty()
  status: Status;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  @ApiProperty()
  paymentStatus: PaymentStatus;

  @IsEnum(Type)
  @IsNotEmpty()
  @ApiProperty()
  type: Type;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  petId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  vetId: string;
}
export class UpdateAppointmentDto {
  @IsDate()
  @IsOptional()
  @ApiProperty()
  appointmentDate: Date;

  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty()
  status: Status;

  @IsEnum(PaymentStatus)
  @IsOptional()
  @ApiProperty()
  paymentStatus: PaymentStatus;

  @IsEnum(Type)
  @IsOptional()
  @ApiProperty()
  type: Type;

  @IsString()
  @IsOptional()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  petId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  vetId: string;
}
