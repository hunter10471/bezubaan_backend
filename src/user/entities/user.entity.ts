import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, unique: true, required: true })
  username: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true, minlength: 8 })
  password: string;
  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;
  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
