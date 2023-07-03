import { Module } from '@nestjs/common';
import { VetService } from './vet.service';
import { VetController } from './vet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VetSchema } from './entities/vet.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vet', schema: VetSchema }])],
  controllers: [VetController],
  providers: [VetService],
  exports: [VetService],
})
export class VetModule {}
