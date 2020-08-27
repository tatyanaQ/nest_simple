import { Test, TestingModule } from '@nestjs/testing';

import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { Cat } from '../entities/cat.entity';
import { createCat } from './helpers/cats.factory';
import { NotFoundException } from '@nestjs/common';

describe('Cats Controller', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [{
        provide: CatsService,
        useValue: {
          async findAll() {},
          async create() {},
          async findOne() {},
        },
      }],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of all cats', async () => {
      const allCats: Cat[] = [createCat()];
      jest.spyOn(catsService, 'findAll').mockImplementation(async () => allCats);

      expect(await catsController.findAll()).toBe(allCats);
    });
  });

  describe('findOne', () => {
    it('Should return a cat', async () => {
      const oneCat: Cat = createCat();
      jest.spyOn(catsService, 'findOne').mockImplementation(async () => oneCat);

      expect(await catsController.findOne(1)).toBe(oneCat);
    });

    it('Should throw error if cat not found', async () => {
      const oneCat: Cat = undefined;
      jest.spyOn(catsService, 'findOne').mockImplementation(async () => oneCat);

      expect(catsController.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
