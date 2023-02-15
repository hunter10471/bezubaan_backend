import { Document } from 'mongoose';
import { Gender } from '../entities/pet.entity';

export interface IPet extends Document {
  readonly name: string;
  readonly age: number;
  readonly gender: Gender;
  readonly image: string;
  readonly species: string;
}
