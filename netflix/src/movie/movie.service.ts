import { Injectable, NotFoundException } from '@nestjs/common';

export type Movie = {
  id: number;
  title: string;
};

@Injectable()
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '반지의 제왕',
    },
  ];

  private idCounter = 3;

  getManyMovies(title?: string) {
    if (!title) {
      return this.movies;
    }
    return this.movies.filter((m) => m.title.startsWith(title)); // 해당 글자로 시작하는 것은 모두 반환
  }

  getMovieById(id: number) {
    const movie = this.movies.find((m) => m.id === id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 Id의 영화 입니다.');
    }
    return movie;
  }

  createMovie(title: string) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };
    this.movies.push(movie);

    return movie;
  }

  updateMovie(id: number, title: string) {
    const movie = this.movies.find((m) => m.id === +id);
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }
    // 덮어씌우기
    Object.assign(movie, { title });

    return movie;
  }

  deleteMovie(id: number) {
    const movieIndex = this.movies.findIndex((m) => m.id === +id);
    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }
    this.movies.splice(movieIndex, 1);
    return id;
  }
}
