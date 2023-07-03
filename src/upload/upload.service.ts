import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Multer } from 'multer';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  async uploadFile(file: Multer.File): Promise<string> {
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    const key = `uploads/${uuidv4()}-${file.originalname}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read', // Optional: Set access control to allow public read
    };

    await this.s3.upload(uploadParams).promise();
    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }
}
