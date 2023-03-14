import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilMysqlService } from './automovil-mysql.service';

describe('AutomovilMysqlService', () => {
  let service: AutomovilMysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomovilMysqlService],
    }).compile();

    service = module.get<AutomovilMysqlService>(AutomovilMysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
