import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'aws-sdk/clients/budgets';
import mongoose from 'mongoose';
import { Pet } from 'src/pet/entities/pet.entity';
import { Vet } from 'src/vet/entities/vet.entity';

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Date })
  @ApiProperty()
  appointmentDate: Date;

  @Prop({ type: Boolean })
  @ApiProperty()
  status: boolean;

  @Prop({ type: Boolean })
  @ApiProperty()
  paymentStatus: boolean;

  @Prop({ type: Boolean })
  @ApiProperty()
  type: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vet' })
  @ApiProperty()
  vet: Vet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' })
  @ApiProperty()
  pet: Pet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @ApiProperty()
  user: User;
}
