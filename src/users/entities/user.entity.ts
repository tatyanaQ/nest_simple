import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { roles } from '../../common/constants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    default: roles.user,
  })
  role: string;

  @Column({
    nullable: true,
  })
  password: string;
}