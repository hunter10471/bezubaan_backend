import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Location {
  @Prop({
    type: String,
    default: 'Point',
    required: true,
    enum: ['Point'],
  })
  type: string;
  @Prop({
    type: [Number],
    index: '2dsphere',
  })
  coordinates: number[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
