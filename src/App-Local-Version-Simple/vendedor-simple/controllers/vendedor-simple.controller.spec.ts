import { Test, TestingModule } from '@nestjs/testing';
import { VendedorSimpleController } from './vendedor-simple.controller';
import { VendedorSimpleService } from './vendedor-simple.service';

describe('VendedorSimpleController', () => {
  let controller: VendedorSimpleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendedorSimpleController],
      providers: [VendedorSimpleService],
    }).compile();

    controller = module.get<VendedorSimpleController>(VendedorSimpleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
