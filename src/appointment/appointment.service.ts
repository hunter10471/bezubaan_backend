import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './entities/appointment.entity';
import { Status } from 'src/common/enums';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment') private appointmentModel: Model<Appointment>,
  ) {}
  async create(data: CreateAppointmentDto): Promise<Appointment> {
    try {
      const newAppointment = new this.appointmentModel(data);
      return await newAppointment.save();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const appointments = await this.appointmentModel.find();
      if (appointments.length === 0) {
        throw new HttpException('No appointments found.', HttpStatus.NOT_FOUND);
      }
      return appointments;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.appointmentModel.findById(id);
      if (!appointment) {
        throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
      }
      return appointment;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: UpdateAppointmentDto) {
    try {
      const appointment = await this.appointmentModel.findByIdAndUpdate(
        id,
        data,
      );
      if (!appointment) {
        throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
      }
      return appointment;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const appointment = await this.appointmentModel.findByIdAndRemove(id);
      if (!appointment) {
        throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
      }
      return appointment;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getVetsAppointments(active: string, vetId: string) {
    try {
      const status = active === 'true' ? Status.PENDING : true;
      let appointments;
      if (status === Status.PENDING) {
        appointments = await this.appointmentModel
          .find({
            vetId: vetId,
            status: status,
          })
          .sort({ appointmentDate: -1 });
      } else {
        appointments = await this.appointmentModel
          .find({
            vetId: vetId,
          })
          .sort({ appointmentDate: -1 });
      }
      return appointments;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsersAppointments(active: string, userId: string) {
    try {
      const status = active === 'true' ? Status.PENDING : true;
      let appointments;
      if (status === Status.PENDING) {
        appointments = await this.appointmentModel
          .find({
            userId: userId,
            status: status,
          })
          .sort({ appointmentDate: -1 });
      } else {
        appointments = await this.appointmentModel
          .find({
            userId: userId,
          })
          .sort({ appointmentDate: -1 });
      }
      return appointments;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
