import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilController } from './automovil.controller';
import { AutomovilService } from '../automovil.service';

describe('AutomovilController', () => {
  let controller: AutomovilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomovilController],
      providers: [AutomovilService],
    }).compile();

    controller = module.get<AutomovilController>(AutomovilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
