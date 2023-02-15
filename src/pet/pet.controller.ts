import { UpdatePetDto, CreatePetDto } from './dto/pet.dto';
import { IPet } from './interface/pet.interface';
import { PetService } from './pet.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}
  @Get(':id')
  async getPet(@Param('id') id: string): Promise<IPet> {
    return await this.petService.getPet({ id });
  }
  @Get()
  async getPets(): Promise<IPet[]> {
    return await this.petService.getPets();
  }
  @Delete(':id')
  async deletePet(@Param('id') id: string): Promise<IPet> {
    return await this.petService.deletePet({ id });
  }
  @Patch()
  async updatePet(@Body() data: UpdatePetDto): Promise<IPet> {
    return await this.petService.updatePet(data);
  }
  @Post()
  async createPet(@Body() data: CreatePetDto): Promise<IPet> {
    return await this.petService.createPet(data);
  }
}
