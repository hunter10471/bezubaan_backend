import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PetModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'bezubaan',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
