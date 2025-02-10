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

  getManyMovies(title?: string) {
    // 데이터가 매우 많을 때 사용하는 필터 기능
    if (!title) {
      return [this.movieRepository.find(), this.movieRepository.count()];
    }
    return this.movieRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
    });
  }

  async getMovieById(id: number) {
    // 아이디를 하나만 찾을 때 사용
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 Id의 영화 입니다.');
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }

    await this.movieRepository.update({ id }, updateMovieDto);

    return await this.movieRepository.findOne({ where: { id } });
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다.');
    }

    await this.movieRepository.delete({ id });
    return id;
  }
}
