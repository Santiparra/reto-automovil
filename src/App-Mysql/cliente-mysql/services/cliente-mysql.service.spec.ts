import { Test, TestingModule } from '@nestjs/testing';
import { ClienteMysqlService } from './cliente-mysql.service';

describe('ClienteMysqlService', () => {
  let service: ClienteMysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteMysqlService],
    }).compile();

    service = module.get<ClienteMysqlService>(ClienteMysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
