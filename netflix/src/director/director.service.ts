import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director } from './entity/director.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    return this.directorRepository.save(createDirectorDto);
  }

  findAll() {
    return this.directorRepository.find();
  }

  findOne(id: number) {
    return this.directorRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto) {
    const director = await this.directorRepository.findOne({
      where: { id },
    });

    if (!director) {
      throw new NotFoundException('존재하지 않는 Id의 영화 입니다.');
    }
    await this.directorRepository.update({ id }, { ...updateDirectorDto });
    return await this.directorRepository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.directorRepository.delete({
      id,
    });
  }
}
