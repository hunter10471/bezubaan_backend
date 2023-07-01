import {
  CreatePetDto,
  UpdatePetDto,
  GetPetDto,
  DeletePetDto,
} from './dto/pet.dto';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(@InjectModel('Pet') private petModel: Model<Pet>) {}

  async createPet(data: CreatePetDto): Promise<Pet> {
    try {
      const existingPet = await this.petModel.findOne({ name: data.name });
      if (existingPet) {
        throw new HttpException(
          `Pet with name ${data.name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const newPet = new this.petModel(data);
      return await newPet.save();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePet(data: UpdatePetDto): Promise<Pet> {
    try {
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
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPet(id: string): Promise<Pet> {
    try {
      const pet = await this.petModel.findById(id);
      if (!pet)
        throw new HttpException(
          'Pet with the given details not found.',
          HttpStatus.NOT_FOUND,
        );
      return pet;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPets(): Promise<Pet[]> {
    try {
      const pets = await this.petModel.find();
      if (pets.length === 0) {
        throw new HttpException('No pets found', HttpStatus.NOT_FOUND);
      }
      return pets;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletePet(data: DeletePetDto): Promise<Pet> {
    try {
      const deletedPet = await this.petModel.findOneAndDelete({
        id: data.id,
      });
      if (!deletedPet)
        throw new HttpException(
          'Pet with the given details not found.',
          HttpStatus.NOT_FOUND,
        );
      return deletedPet;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
