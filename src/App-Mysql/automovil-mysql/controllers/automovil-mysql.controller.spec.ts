import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilMysqlController } from './automovil-mysql.controller';
import { AutomovilMysqlService } from './automovil-mysql.service';

describe('AutomovilMysqlController', () => {
  let controller: AutomovilMysqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomovilMysqlController],
      providers: [AutomovilMysqlService],
    }).compile();

    controller = module.get<AutomovilMysqlController>(AutomovilMysqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
