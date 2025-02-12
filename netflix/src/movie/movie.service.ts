import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly movieDetailRepository: Repository<MovieDetail>,
  ) {}

  async getManyMovies(title?: string) {
    // 데이터가 매우 많을 때 사용하는 필터 기능
    if (!title) {
      return [
        await this.movieRepository.find({ relations: ['detail'] }),
        await this.movieRepository.count(),
      ];
    }
    return this.movieRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
      relations: ['detail'],
    });
  }

  async getMovieById(id: number) {
    // 아이디를 하나만 찾을 때 사용
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 Id의 영화 입니다.');
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const movieDetail = await this.movieDetailRepository.save({
      detail: createMovieDto.detail,
    });

    return await this.movieRepository.save({
      title: createMovieDto.title,
      genre: createMovieDto.genre,
      detail: movieDetail,
    });
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }

    const { detail, ...movieRest } = updateMovieDto;

    await this.movieRepository.update(id, movieRest);

    if (detail) {
      await this.movieDetailRepository.update(
        {
          id: movie.detail.id,
        },
        { detail },
      );
    }

    return await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }

    await this.movieRepository.delete(id);
    await this.movieDetailRepository.delete(movie.detail.id);
    return id;
  }
}
