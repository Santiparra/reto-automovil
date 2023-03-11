import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilService } from './automovil.service';

describe('AutomovilService', () => {
  let service: AutomovilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomovilService],
    }).compile();

    service = module.get<AutomovilService>(AutomovilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
