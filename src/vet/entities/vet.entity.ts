import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FieldOfStudy, University } from 'src/common/enums';
import { Gender } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Schema({ timestamps: true })
export class Vet {
  @Prop({ type: String, unique: true, required: true })
  @ApiProperty()
  username: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  email: string;

  @Prop({ type: String, required: true, minlength: 8 })
  @ApiProperty()
  password: string;

  @Prop({ type: String, enum: Gender, required: true })
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @Prop({ type: String })
  @ApiProperty()
  avatar: string;

  @Prop({ type: Number, required: true })
  @ApiProperty()
  yearsOfExperience: number;

  @Prop({ type: [String] })
  @ApiProperty()
  specializations: string[];

  @Prop({ enum: FieldOfStudy, required: true })
  @ApiProperty({ enum: FieldOfStudy })
  fieldOfStudy: FieldOfStudy;

  @Prop({ enum: University, required: true })
  @ApiProperty({ enum: University })
  university: University;

  @Prop({ type: String, required: true })
  @ApiProperty()
  degreeImage: string;

  @Prop({ type: String, required: true })
  @ApiProperty()
  licenseImage: string;

  @Prop({ type: Boolean, default: false })
  @ApiProperty()
  isApproved: boolean;
}

export const VetSchema = SchemaFactory.createForClass(Vet);
