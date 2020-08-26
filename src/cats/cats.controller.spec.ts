import { Test, TestingModule } from '@nestjs/testing';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

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
      const result: Cat[] = [];
      jest.spyOn(catsService, 'findAll').mockImplementation(async () => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});
