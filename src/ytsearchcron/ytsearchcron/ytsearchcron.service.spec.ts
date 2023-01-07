import { Test, TestingModule } from '@nestjs/testing';
import { YtSearchCronService } from './ytsearchcron.service';

describe('YtSearchCronService', () => {
  let service: YtSearchCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtSearchCronService],
    }).compile();

    service = module.get<YtSearchCronService>(YtSearchCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
