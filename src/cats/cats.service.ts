import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { Cat } from './entities/cat.entity';
import { CreateCat } from './dto/cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    // private connection: Connection
  ) { }

  async create(cat: CreateCat): Promise<Cat> {
    const newCat = await this.catsRepository.save(cat);
    return newCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find({ relations: ['photos'] });
    // let cats;
    // const queryRunner = this.connection.createQueryRunner();
    // queryRunner.connect();

    // queryRunner.startTransaction();
    // try {
    //   cats = await queryRunner.manager.find('Cat');
    //   await queryRunner.commitTransaction();
    //   return cats;
    // } catch (e) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }
  }

  findOne(id: number): Promise<Cat> {
    Logger.log('log')
    Logger.warn('warn')
    Logger.verbose('varbose')
    return this.catsRepository.findOne(id);
  }
}
