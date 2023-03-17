import { Test, TestingModule } from '@nestjs/testing';
import { ClienteSimpleService } from './cliente-simple.service';

describe('ClienteSimpleService', () => {
  let service: ClienteSimpleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteSimpleService],
    }).compile();

    service = module.get<ClienteSimpleService>(ClienteSimpleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
