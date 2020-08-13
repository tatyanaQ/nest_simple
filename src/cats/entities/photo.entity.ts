import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

import { Cat } from './cat.entity';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    name: 'cat_id',
  })
  catId: number;

  @ManyToOne(type => Cat, cat => cat.photos)
  @JoinColumn({ name: 'cat_id' })
  cat: Cat;
}