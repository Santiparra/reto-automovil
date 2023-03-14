import { Test, TestingModule } from '@nestjs/testing';
import { VendedorMysqlController } from './vendedor-mysql.controller';
import { VendedorMysqlService } from './vendedor-mysql.service';

describe('VendedorMysqlController', () => {
  let controller: VendedorMysqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendedorMysqlController],
      providers: [VendedorMysqlService],
    }).compile();

    controller = module.get<VendedorMysqlController>(VendedorMysqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
