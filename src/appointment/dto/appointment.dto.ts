import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  appointmentDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  status: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  paymentStatus: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  type: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  pet: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  vet: string;
}
