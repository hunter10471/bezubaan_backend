import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AnimalType, Gender } from 'src/common/enums';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Pet {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  age: number;
  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: String, enum: AnimalType, required: true })
  animalType: AnimalType;
  @Prop({ type: String })
  species: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: User;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
