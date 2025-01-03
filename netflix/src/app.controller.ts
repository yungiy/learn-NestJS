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

type Movie = {
  id: number;
  title: string;
};

@Controller('movie') // 콘트롤러에 엔드포인트를 넣어주면 공통된 엔드포인트로 통합됨
export class AppController {
  private movies: Movie[] = [
    { id: 1, title: '해리포터' },
    { id: 2, title: '반지의 제왕' },
  ];
  private idCounter = 3;

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query('title') title?: string) {
    if (!title) {
      return this.movies;
    }

    return this.movies.filter((m) => m.title === title);
   // return this.movies.filter((m) => m.title.startsWith(title)); 타이틀로 시작하는 단어들 모두 반환 
   // ex) 겨울왕국1 겨울왕국2 겨울왕국3
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }
    return movie;
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
    const movie = this.movies.find((m) => m.id === +id);

    // 존재하지 않으면 에러 반환
    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }

    Object.assign(movie, { title });
    return movie;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    const movieIndex = this.movies.findIndex((m) => m.id === +id);

    // 존재하지 않으면 에러 반환
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }

    this.movies.splice(movieIndex, 1);
    return id;
  }
}
