import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VetService } from './vet.service';
import { CreateVetDto } from './dto/vet.dto';

@Controller('vet')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Post()
  create(@Body() createVetDto: CreateVetDto) {
    return this.vetService.create(createVetDto);
  }

  @Get()
  findAll() {
    return this.vetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVetDto) {
    return this.vetService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vetService.remove(+id);
  }
}
