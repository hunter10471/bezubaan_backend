import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FieldOfStudy, Gender, University } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { LocationSchema, Location } from 'src/common/entities/location.entity';

@Schema({ timestamps: true })
export class Vet {
  @Prop({ type: String, unique: true, required: true })
  @ApiProperty()
  username: string;

  @Prop({ type: String, unique: true, required: true })
  @ApiProperty()
  email: string;

  @Prop({ type: String, minlength: 8, required: true })
  @ApiProperty()
  password: string;

  @Prop({ type: String, enum: Gender, required: true })
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @Prop({ type: String })
  @ApiProperty()
  avatar: string;

  @Prop({ type: Number })
  @ApiProperty()
  yearsOfExperience: number;

  @Prop({ type: [String] })
  @ApiProperty()
  specializations: string[];

  @Prop({ enum: FieldOfStudy })
  @ApiProperty({ enum: FieldOfStudy })
  fieldOfStudy: FieldOfStudy;

  @Prop({ enum: University })
  @ApiProperty({ enum: University })
  university: University;

  @Prop({ type: String })
  @ApiProperty()
  degreeImage: string;

  @Prop({ type: String })
  @ApiProperty()
  licenseImage: string;

  @Prop({ type: Boolean, default: false })
  @ApiProperty()
  isApproved: boolean;

  @Prop({ type: String })
  @ApiProperty()
  clinicName: string;

  @Prop({ type: String })
  @ApiProperty()
  address: string;

  @Prop({ type: String })
  @ApiProperty()
  licenseNumber: string;

  @Prop({ type: LocationSchema })
  @ApiProperty()
  location: Location;

  @Prop({ type: String })
  @ApiProperty()
  description: string;
}

export const VetSchema = SchemaFactory.createForClass(Vet);
