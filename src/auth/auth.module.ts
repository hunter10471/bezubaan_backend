import { UserModule } from './../user/user.module';
import { UserSchema } from '../user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VetModule } from 'src/vet/vet.module';
import { VetSchema } from 'src/vet/entities/vet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Vet', schema: VetSchema },
    ]),
    UserModule,
    VetModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
