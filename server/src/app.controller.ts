import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("uploadurl")
  async getPresignedUrl(@Query() query): Promise<string> {
    return await this.appService.getPresignedUrl(query.fileName,query.fileType);
  }
}
