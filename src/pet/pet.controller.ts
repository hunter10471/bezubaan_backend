import { UpdatePetDto, CreatePetDto } from './dto/pet.dto';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({ summary: 'Get pet by id' })
  @ApiResponse({
    status: 200,
    description: 'Pet found',
    type: Pet,
  })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-pet-by-id/:id')
  async getPet(@Param('id') id: string) {
    return await this.petService.getPet(id);
  }

  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({
    status: 200,
    description: 'Pets found',
    type: [Pet],
  })
  @ApiResponse({ status: 404, description: 'Pets not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-all-pets')
  async getPets() {
    return await this.petService.getPets();
  }

  @ApiOperation({ summary: 'Delete pet by id' })
  @ApiResponse({
    status: 200,
    description: 'Pet deleted',
    type: Pet,
  })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete('delete-pet-by-id/:id')
  async deletePet(@Param('id') id: string) {
    return await this.petService.deletePet(id);
  }

  @ApiOperation({ summary: 'Update pet by id' })
  @ApiResponse({
    status: 200,
    description: 'Pet updated',
    type: Pet,
  })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-pet-by-id/:id')
  async updatePet(@Param('id') id: string, @Body() data: UpdatePetDto) {
    return await this.petService.updatePet(id, data);
  }

  @ApiOperation({ summary: 'Create pet' })
  @ApiResponse({
    status: 200,
    description: 'Pet created',
    type: Pet,
  })
  @ApiResponse({ status: 409, description: 'Pet already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('create-pet')
  async createPet(@Body() data: CreatePetDto) {
    return await this.petService.createPet(data);
  }
}
