import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from './entities/appointment.entity';
import { SchemaFactory } from '@nestjs/mongoose';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: 'Create new appointment' })
  @ApiResponse({
    status: 200,
    description: 'Appointment found',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('create-appointment')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'Appointments found',
    type: [Appointment],
  })
  @ApiResponse({ status: 404, description: 'Appointments not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-all-appointments')
  findAll() {
    return this.appointmentService.findAll();
  }

  @ApiOperation({ summary: 'Get appointment by id' })
  @ApiResponse({
    status: 200,
    description: 'Appointment found',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-appointment-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update appointment by id' })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-appointment-by-id/:id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: any) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @ApiOperation({ summary: 'Delete appointment by id' })
  @ApiResponse({
    status: 200,
    description: 'Appointment deleted',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete('delete-appointment-by-id/:id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }

  @ApiOperation({ summary: 'Get appointments by vet id' })
  @ApiResponse({
    status: 200,
    description: 'Appointments found',
    type: [Appointment],
  })
  @ApiResponse({ status: 404, description: 'Appointments not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-appointment-by-vet-id/:id')
  findVetAppointments(
    @Param('id') id: string,
    @Query('active') active: string,
  ) {
    return this.appointmentService.getVetsAppointments(active, id);
  }

  @ApiOperation({ summary: 'Get appointments by user id' })
  @ApiResponse({
    status: 200,
    description: 'Appointments found',
    type: [Appointment],
  })
  @ApiResponse({ status: 404, description: 'Appointments not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-appointment-by-user-id/:id')
  findUserAppointments(
    @Param('id') id: string,
    @Query('active') active: string,
  ) {
    return this.appointmentService.getUsersAppointments(active, id);
  }
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
