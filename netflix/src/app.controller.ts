import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
  //character: string[];
}

// 무비에 대한 api 정의 @Controller('movie')
@Controller('movie')
export class AppController {
  private movies: Movie[] = [
    {
      id: 1,
      title: '해리포터',
      //character: ['해리포터', '엠마왓슨'],
    },
    {
      id: 2,
      title: '반지의 제왕',
      //character: ['프로도', '간달프', '아라곤', '레골라스'],
    },
    {
      id: 3,
      title: '어벤져스',
      //character: ['아이언맨', '캡틴 아메리카', '토르', '헐크'],
    },
    {
      id: 4,
      title: '원피스',
      //character: ['루피', '조로', '나미', '상디'],
    },
  ];

  private idCounter = 5;

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query() title: string) {
    if (!title) {
      return this.movies;
    }
    return this.movies.filter((m) => m.title.startsWith(title));
  }

  // 변수를 불러옴 @Param('변수')
  @Get(':id')
  getMovie(@Param('id') id: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('없는 영화 id 값임!');
    }
  }

  @Post()
  postMovie(@Body('title') title: string) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };
    this.movies.push(movie);

    return movie;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body('title') title: string) {
    const movie = this.movies.find((m) => m.id == +id);

    if (!movie) {
      throw new NotFoundException('없는 영화 id 값임!');
    }

    Object.assign(movie, { title });

    return movie;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    const movieIndex = this.movies.findIndex((m) => m.id == +id);

    if (!movieIndex) {
      throw new NotFoundException('없는 영화 id 값임!');
    }

    this.movies.splice(movieIndex, 1);
    return id;
  }
}
