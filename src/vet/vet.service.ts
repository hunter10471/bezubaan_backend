import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateVetDto } from './dto/vet.dto';
import { Vet } from './entities/vet.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpVetDto } from 'src/auth/dto/auth.dto';
@Injectable()
export class VetService {
  constructor(@InjectModel('Vet') private readonly vetModel: Model<Vet>) {}
  async createVet(createVetDto: SignUpVetDto): Promise<Vet> {
    try {
      const existingVet = await this.vetModel.findOne({
        email: createVetDto.email,
      });
      if (existingVet) {
        throw new HttpException('Vet already exists', HttpStatus.CONFLICT);
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createVetDto.password, salt);
      const newVet = new this.vetModel({
        ...createVetDto,
        password: hashedPassword,
      });
      return await newVet.save();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Vet[]> {
    try {
      const vets = await this.vetModel.find();
      if (vets.length === 0) {
        throw new HttpException(`Vets not found`, HttpStatus.NOT_FOUND);
      }
      return vets;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Vet> {
    try {
      const vet = await this.vetModel.findById(id);
      if (!vet) {
        throw new HttpException(
          `Vet with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return vet;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateVetDto: UpdateVetDto): Promise<Vet> {
    try {
      await this.findOne(id);
      return await this.vetModel.findByIdAndUpdate(id, updateVetDto);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<Vet> {
    try {
      await this.findOne(id);
      return await this.vetModel.findByIdAndDelete(id);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
