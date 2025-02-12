import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieDetail } from './movie-detail.entity';
import { BaseEntity } from '../../common/entity/base.entity';
import { Director } from '../../director/entity/director.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @OneToOne(() => MovieDetail, (movieDetail) => movieDetail.id)
  @JoinColumn()
  detail: MovieDetail;

  @ManyToOne(() => Director, (director) => director.id)
  director: Director;
}
