import { Test, TestingModule } from '@nestjs/testing';
import { VendedorSimpleService } from './vendedor-simple.service';

describe('VendedorSimpleService', () => {
  let service: VendedorSimpleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendedorSimpleService],
    }).compile();

    service = module.get<VendedorSimpleService>(VendedorSimpleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
