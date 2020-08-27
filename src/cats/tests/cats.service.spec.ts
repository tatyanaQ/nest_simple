import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../cats.service';
import { UtilsModule } from '../../common/modules/utils/utils.module';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
