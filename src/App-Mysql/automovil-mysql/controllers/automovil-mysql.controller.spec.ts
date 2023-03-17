import { Test, TestingModule } from '@nestjs/testing';
import { AutomovilMysqlService } from '../services/automovil-mysql.service';
import { AutomovilMysqlController } from './automovil-mysql.controller';


describe('AutomovilMysqlController', () => {
  let controller: AutomovilMysqlController;

  const mockService = {
    create: jest.fn(
      dto => { return{
        id: "number",
        ...dto
      }}
    ),
    update: jest.fn().mockImplementation(
      (id, dto) => ({
        id,
        ...dto
      })
    )
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomovilMysqlController],
      providers: [AutomovilMysqlService],
    })
    .overrideProvider(AutomovilMysqlService)
    .useValue(mockService)
    .compile();

    controller = module.get<AutomovilMysqlController>(AutomovilMysqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('crear un usuario', () => {
    const dto = {name: "franco"}
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: "franco"
    });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('editar un usuario', () => {
    const dto = {name: "franco"}
    expect(controller.update("1", dto)).toEqual({
      id: "1",
      ...dto
    });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });
});
