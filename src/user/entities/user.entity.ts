import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Pet } from 'src/pet/entities/pet.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Gender } from 'src/common/enums';
import { LocationSchema, Location } from 'src/common/entities/location.entity';
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, unique: true, required: true })
  @ApiProperty()
  username: string;

  @Prop({ type: String, required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ type: String, required: true, minlength: 8 })
  @ApiProperty()
  password: string;

  @Prop({ type: String, enum: Gender, required: true })
  @ApiProperty()
  gender: Gender;

  @Prop({ type: String })
  @ApiProperty()
  avatar: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Pet' })
  @ApiProperty()
  pets: Pet[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Appointment' })
  @ApiProperty()
  appointments: Appointment[];

  @Prop({ type: Boolean, default: false })
  @ApiProperty()
  isAdmin: boolean;

  @Prop({ type: LocationSchema })
  @ApiProperty()
  location: Location;
}

export const UserSchema = SchemaFactory.createForClass(User);
