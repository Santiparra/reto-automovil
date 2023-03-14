import { Test, TestingModule } from '@nestjs/testing';
import { ClienteMysqlController } from './cliente-mysql.controller';
import { ClienteMysqlService } from './cliente-mysql.service';

describe('ClienteMysqlController', () => {
  let controller: ClienteMysqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteMysqlController],
      providers: [ClienteMysqlService],
    }).compile();

    controller = module.get<ClienteMysqlController>(ClienteMysqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
