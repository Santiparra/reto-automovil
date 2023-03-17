import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilSimpleController } from './automovil-simple.controller';
import { AutomovilSimpleService } from '../services/automovil-simple.service';

describe('AutomovilSimpleController', () => {
  let controller: AutomovilSimpleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomovilSimpleController],
      providers: [AutomovilSimpleService],
    }).compile();

    controller = module.get<AutomovilSimpleController>(AutomovilSimpleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
