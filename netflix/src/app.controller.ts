import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies() {
    return [
      {
        id: 1,
        name: '해리포터',
        character: ['해리포터', '엠마왓슨'],
      },
      {
        id: 2,
        name: '반지의 제왕',
        character: ['프로도', '간달프', '아라곤', '레골라스'],
      },
      {
        id: 3,
        name: '어벤져스',
        character: ['아이언맨', '캡틴 아메리카', '토르', '헐크'],
      },
      {
        id: 4,
        name: '원피스',
        character: ['루피', '조로', '나미', '상디'],
      },
    ];
  }

  @Get()
  getMovie() {
    return {
      id: 1,
      name: '해리포터',
      character: ['해리포터', '엠마왓슨'],
    };
  }

  @Post()
  postMovie() {
    return {
      id: 5,
      name: '나루토',
      character: ['나루토', '사스케', '사쿠라', '카카시'],
    };
  }

  @Patch()
  patchMovie() {
    return {
      id: 4,
      name: '원피스',
      character: ['루피', '조로', '나미', '샹디'],
    };
  }

  @Delete()
  deleteMovie() {
    return 5
  }
}
