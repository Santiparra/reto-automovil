import { Test, TestingModule } from '@nestjs/testing';
import { VendedorMysqlService } from './vendedor-mysql.service';

describe('VendedorMysqlService', () => {
  let service: VendedorMysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendedorMysqlService],
    }).compile();

    service = module.get<VendedorMysqlService>(VendedorMysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
