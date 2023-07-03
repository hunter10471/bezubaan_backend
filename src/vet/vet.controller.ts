import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { VetService } from './vet.service';
import { UpdateVetDto } from './dto/vet.dto';
import { SignUpVetDto } from 'src/auth/dto/auth.dto';
import { Vet } from './entities/vet.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Vets')
@Controller('vet')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @Post('create-vet')
  create(@Body() createVetDto: SignUpVetDto): Promise<Vet> {
    return this.vetService.createVet(createVetDto);
  }

  @Get('get-all-vets')
  findAll(): Promise<Vet[]> {
    return this.vetService.findAll();
  }

  @Get('get-vet-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.vetService.findOne(+id);
  }

  @Put('update-vet-by-id/:id')
  update(
    @Param('id') id: string,
    @Body() updateVetDto: UpdateVetDto,
  ): Promise<Vet> {
    return this.vetService.update(+id, updateVetDto);
  }

  @Delete('delete-vet-by-id/:id')
  remove(@Param('id') id: string): Promise<Vet> {
    return this.vetService.remove(+id);
  }
}
