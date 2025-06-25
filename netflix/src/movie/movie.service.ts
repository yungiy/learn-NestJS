import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];
  
  private idCounter = 5;

  constructor() {
    const movie1 = new Movie();
    movie1.id = 1;
    movie1.title = '해리포터';
    movie1.genre = 'fantasy';

    const movie2 = new Movie();
    movie2.id = 2;
    movie2.title = '반지의 제왕';
    movie2.genre = 'fantasy';

    const movie3 = new Movie();
    movie3.id = 3;
    movie3.title = '어벤져스';
    movie3.genre = 'SF';

    const movie4 = new Movie();
    movie4.id = 4;
    movie4.title = '원피스';
    movie4.genre = 'animation';

    this.movies = [movie1, movie2, movie3, movie4];
  }

  getManyMovies(title?: string) {
    if (!title) {
      return this.movies;
    }
    return this.movies.filter((m) => m.title.startsWith(title));
  }

  getMovieById(id: number) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('없는 영화 id 값임!');
    }

    return movie;
  }

  createMovie(cretateMovieDto: CreateMovieDto) {
    const movie: Movie = {
      id: this.idCounter++,
      ...cretateMovieDto,
    };
    this.movies.push(movie);

    return movie;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.movies.find((m) => m.id == +id);

    if (!movie) {
      throw new NotFoundException('없는 영화 id 값임!');
    }

    Object.assign(movie, updateMovieDto);

    return movie;
  }

  deleteMovie(id: number) {
    const movieIndex = this.movies.findIndex((m) => m.id == +id);

    if (!movieIndex) {
      throw new NotFoundException('없는 영화 id 값임!');
    }

    this.movies.splice(movieIndex, 1);
    return id;
  }
}

//  {
//       id: 1,
//       title: '해리포터',
//       genre: 'fantasy',
//     },
//     {
//       id: 2,
//       title: '반지의 제왕',
//       genre: 'fantasy',
//     },
//     {
//       id: 3,
//       title: '어벤져스',
//       genre: 'SF',
//     },
//     {
//       id: 4,
//       title: '원피스',
//       genre: 'animation',
//     },