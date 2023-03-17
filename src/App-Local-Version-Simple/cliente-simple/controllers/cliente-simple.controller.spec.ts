import { Test, TestingModule } from '@nestjs/testing';
import { ClienteSimpleService } from '../services/cliente-simple.service';
import { ClienteSimpleController } from './cliente-simple.controller';

describe('ClienteSimpleController', () => {
  let controller: ClienteSimpleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteSimpleController],
      providers: [ClienteSimpleService],
    }).compile();

    controller = module.get<ClienteSimpleController>(ClienteSimpleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
