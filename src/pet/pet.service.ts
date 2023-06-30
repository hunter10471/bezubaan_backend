import {
  CreatePetDto,
  UpdatePetDto,
  GetPetDto,
  DeletePetDto,
} from './dto/pet.dto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(@InjectModel('Pet') private petModel: Model<Pet>) {}
  async createPet(data: CreatePetDto): Promise<Pet> {
    const newPet = new this.petModel(data);
    return await newPet.save();
  }
  async updatePet(data: UpdatePetDto): Promise<Pet> {
    const existingPet = await this.petModel.findOneAndUpdate(
      { id: data.id },
      data,
      {
        new: true,
      },
    );
    if (!existingPet)
      throw new HttpException(
        `User with id ${data.id} could not be updated.`,
        HttpStatus.NOT_FOUND,
      );
    return existingPet;
  }
  async getPet(data: GetPetDto): Promise<Pet> {
    const pet = await this.petModel.findOne({ id: data.id });
    if (!pet)
      throw new HttpException(
        'Pet with the given details not found.',
        HttpStatus.NOT_FOUND,
      );
    return pet;
  }
  async getPets(): Promise<Pet[]> {
    return await this.petModel.find();
  }
  async deletePet(data: DeletePetDto): Promise<Pet> {
    const deletedPet = await this.petModel.findOneAndDelete({
      id: data.id,
    });
    if (!deletedPet)
      throw new HttpException(
        'Pet with the given details not found.',
        HttpStatus.NOT_FOUND,
      );
    return deletedPet;
  }
}
