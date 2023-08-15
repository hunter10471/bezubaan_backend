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
  async createVet(data: SignUpVetDto): Promise<Vet> {
    try {
      data.email = data.email.toLowerCase();
      const existingVet = await this.vetModel.findOne({
        email: data.email,
      });
      if (existingVet) {
        throw new HttpException('Vet already exists', HttpStatus.CONFLICT);
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);
      const newVet = new this.vetModel({
        ...data,
        password: hashedPassword,
      });
      return await newVet.save();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(approved: string): Promise<Vet[]> {
    try {
      let vets;
      if (approved === 'true') {
        vets = await this.vetModel.find({ isApproved: true });
      } else {
        vets = await this.vetModel.find();
      }
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

  async update(id: number, data: UpdateVetDto): Promise<Vet> {
    try {
      if (data.email) {
        data.email = data.email.toLowerCase();
      }
      return await this.vetModel.findByIdAndUpdate(id, data);
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

  async findVetsByQuery(partialQuery: string): Promise<Vet[]> {
    try {
      const query = new RegExp(partialQuery, 'i');
      const vets = await this.vetModel.find({
        isApproved: true,
        $or: [
          { username: query },
          { clinicName: query },
          { fieldOfStudy: query },
          { specializations: query },
        ],
      });
      return vets;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findClosestVets({
    lat,
    long,
  }: {
    lat: string;
    long: string;
  }): Promise<Vet[]> {
    try {
      const vets = await this.findAll('true');
      const closeVets = [];

      function distance(lat1, lon1, lat2, lon2, unit) {
        const radlat1 = (Math.PI * lat1) / 180;
        const radlat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radtheta = (Math.PI * theta) / 180;
        let dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
          dist = dist * 1.609344;
        }
        if (unit == 'N') {
          dist = dist * 0.8684;
        }
        return dist;
      }

      for (let i = 0; i < vets.length; i++) {
        const km = distance(
          parseFloat(lat),
          parseFloat(long),
          vets[i].location.coordinates[0],
          vets[i].location.coordinates[1],
          'K',
        );
        if (km <= 5) {
          closeVets.push(vets[i]);
        }
      }
      return closeVets;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
