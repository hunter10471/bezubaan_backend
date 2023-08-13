import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'aws-sdk/clients/budgets';
import mongoose from 'mongoose';
import { PaymentStatus, Status, Type } from 'src/common/enums';
import { Pet } from 'src/pet/entities/pet.entity';
import { Vet } from 'src/vet/entities/vet.entity';

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Date, required: true })
  @ApiProperty()
  appointmentDate: Date;

  @Prop({ type: String, enum: Status, default: Status.PENDING })
  @ApiProperty()
  status: Status;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.UNPAID })
  @ApiProperty()
  paymentStatus: PaymentStatus;

  @Prop({ type: String, enum: Type, required: true })
  @ApiProperty()
  type: Type;

  @Prop({ type: Number, required: true })
  @ApiProperty()
  amount: number;

  @Prop({ type: Number })
  @ApiProperty()
  rating: number;

  @Prop({ type: String })
  @ApiProperty()
  review: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vet', required: true })
  @ApiProperty()
  vetId: Vet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true })
  @ApiProperty()
  petId: Pet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty()
  userId: User;
}
