import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VetService } from './vet.service';
import { UpdateVetDto } from './dto/vet.dto';
import { Vet } from './entities/vet.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Vets')
@Controller('vet')
export class VetController {
  constructor(private readonly vetService: VetService) {}

  @ApiOperation({ summary: 'Get all vets' })
  @ApiResponse({
    status: 200,
    description: 'Vet found',
  })
  @ApiResponse({ status: 404, description: 'Vets not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-all-vets')
  findAll(@Query('approved') approved: string): Promise<Vet[]> {
    return this.vetService.findAll(approved);
  }

  @ApiOperation({ summary: 'Get vet by id' })
  @ApiResponse({
    status: 200,
    description: 'Vet found',
  })
  @ApiResponse({ status: 404, description: 'Vet not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-vet-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.vetService.findOne(id);
  }

  @ApiOperation({ summary: 'Update vet by id' })
  @ApiResponse({
    status: 200,
    description: 'Vet updated',
  })
  @ApiResponse({ status: 404, description: 'Vet not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put('update-vet-by-id/:id')
  update(
    @Param('id') id: string,
    @Body() updateVetDto: UpdateVetDto,
  ): Promise<Vet> {
    return this.vetService.update(+id, updateVetDto);
  }

  @ApiOperation({ summary: 'Delete vet by id' })
  @ApiResponse({
    status: 200,
    description: 'Vet deleted',
  })
  @ApiResponse({ status: 404, description: 'Vet not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete('delete-vet-by-id/:id')
  remove(@Param('id') id: string): Promise<Vet> {
    return this.vetService.remove(id);
  }

  @ApiOperation({ summary: 'Get vets by query' })
  @ApiResponse({
    status: 200,
    description: 'Vets found',
  })
  @ApiResponse({ status: 404, description: 'Vets not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-vets-by-query')
  findVetsByQuery(@Query('query') query: string): Promise<Vet[]> {
    return this.vetService.findVetsByQuery(query);
  }

  @ApiOperation({ summary: 'Get vets by distance' })
  @ApiResponse({
    status: 200,
    description: 'Vets found',
  })
  @ApiResponse({ status: 404, description: 'Vets not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('get-vets-by-distance/:lat/:long')
  findClosestVets(
    @Param('lat') lat: string,
    @Param('long') long: string,
  ): Promise<Vet[]> {
    return this.vetService.findClosestVets({ lat, long });
  }
}
