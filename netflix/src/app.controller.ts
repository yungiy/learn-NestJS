import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('movie')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies() {
    return [
      {
        id: 1,
        name: '해리포터',
        character: ['해리포터', '헤르미온느', '덤블도어'],
      },
      {
        id: 2,
        name: '반지의 제왕',
        character: ['간달프', '골룸', '존'],
      },
    ];
  }

  @Get(':id')
  getMovie() {
    return {
      id: 1,
      name: '해리포터',
      character: ['해리포터', '헤르미온느', '덤블도어'],
    };
  }

  @Post()
  postMovie() {
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '헐크', '캡틴'],
    };
  }

  @Patch(':id')
  patchMovie() {
    return {
      id: 3,
      name: '어벤져스',
      character: ['아이언맨', '위도우'],
    };
  }

  @Delete(':id')
  deleteMovie() {
    return 3;
  }
}
