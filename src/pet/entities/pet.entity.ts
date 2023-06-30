import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Schema({ timestamps: true })
export class Pet {
  @Prop({ type: String, unique: true, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  age: number;
  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: String })
  species: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  owner: User;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
