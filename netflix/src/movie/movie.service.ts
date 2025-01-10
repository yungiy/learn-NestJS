import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getManyMovies(title?: string) {
    // 나중에 title 필터 기능 추가

    if (!title) {
      return [
        await this.movieRepository.find(),
        await this.movieRepository.count(),
      ];
    }
    return this.movieRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });

    // if (!title) {
    //   return this.movies;
    // }

    // return this.movies.filter((m) => m.title.startsWith(title)); // 타이틀로 시작하는 영화 모두반환
    // // ex) 겨울왕국1 겨울왕국2 겨울왕국3
  }
  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: ['detail'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {

    const movie = await this.movieRepository.save();
    return movie;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.movieRepository.findOne({
      where: {
        id,
      },
    });

    // 존재하지 않으면 에러 반환
    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }

    //this.movieRepository.update({ id });

    const newMovie = this.movieRepository.findOne({
      where: {
        id,
      },
    });
    return newMovie;
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    // 존재하지 않으면 에러 반환
    if (!movie) {
      throw new NotFoundException('존재하지 않은 영화입니다.'); // 404 에러를 반환
    }
    await this.movieRepository.delete(id);
    return id;
  }
}
