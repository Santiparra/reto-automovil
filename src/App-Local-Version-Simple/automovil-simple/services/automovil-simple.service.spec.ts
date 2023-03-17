import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilSimpleService } from './automovil-simple.service';

describe('AutomovilSimpleService', () => {
  let service: AutomovilSimpleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomovilSimpleService],
    }).compile();

    service = module.get<AutomovilSimpleService>(AutomovilSimpleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
