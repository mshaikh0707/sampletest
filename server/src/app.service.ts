import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

let s3;
let bucket;
@Injectable()
export class AppService {
  constructor() {
    s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: "",
      secretAccessKey: "",
      region: "ap-south-1",
    });
    // s3 = new AWS.S3();
    bucket = "";

  }
  getHello(): string {
    return 'Hello World!';
  }

  public async getPresignedUrl(fileName: string, fileType: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: fileName,
        Expires: 3000,
        ACL: 'public-read',
        ContentType: fileType
      };
      s3.getSignedUrl('putObject', params, (err: Error, url: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  }

}
