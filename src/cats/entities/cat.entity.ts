import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Photo } from './photo.entity';

@Entity({ name: 'cats' })
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @OneToMany(type => Photo, photo => photo.cat)
  photos: Photo[];

}