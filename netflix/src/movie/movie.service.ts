import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

export type Movie = {
  id: number;
  title: string;
  genre: string;
};

@Injectable()
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1, title: '해리포터',
      genre: 'fantasy'
    },
    {
      id: 2, title: '반지의 제왕',
      genre: 'action'
    },
  ];
  private idCounter = 3;

  getManyMovies(title?: string) {
    if (!title) {
      return this.movies;
    }

    return this.movies.filter((m) => m.title.startsWith(title)); // 타이틀로 시작하는 영화 모두반환
    // ex) 겨울왕국1 겨울왕국2 겨울왕국3
  }
  getMovieById(id: number) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }
    return movie;
  }

  createMovie(createMovieDto: CreateMovieDto) {
    const movie: Movie = {
      id: this.idCounter++,
      ...createMovieDto
    };

    this.movies.push(movie);

    return movie;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.movies.find((m) => m.id === +id);

    // 존재하지 않으면 에러 반환
    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }

    Object.assign(movie, updateMovieDto);
    return movie;
  }

  deleteMovie(id: number) {
    const movieIndex = this.movies.findIndex((m) => m.id === +id);

    // 존재하지 않으면 에러 반환
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }

    this.movies.splice(movieIndex, 1);
    return id;
  }
}
