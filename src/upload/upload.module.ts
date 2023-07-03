import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [
    {
      provide: S3,
      useFactory: (configService: ConfigService) => {
        return new S3({
          region: configService.get('AWS_REGION'),
          accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        });
      },
      inject: [ConfigService],
    },
    UploadService,
  ],
})
export class AwsModule {}
