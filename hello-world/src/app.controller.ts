import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get() // 어노테이션
  // @Post()
  // @Put()
  // @Patch()
  @Delete()
  getHello(): string {
    return 'hello Yungiy';
    // return this.appService.getHello();
  }
}
