import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  AppointmentController,
  AppointmentSchema,
} from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appointment', schema: AppointmentSchema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
