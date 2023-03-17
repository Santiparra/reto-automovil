import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarMysql } from 'src/App-Mysql/entities/car.entity';
import { AutomovilMysqlService } from './automovil-mysql.service';

describe('AutomovilMysqlService', () => {
  let service: AutomovilMysqlService;

  const mockRepopo ={
   
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomovilMysqlService, 
        {
        provide: getRepositoryToken(CarMysql),
        useValue: mockRepopo
      }
    ],
    }).compile();

    service = module.get<AutomovilMysqlService>(AutomovilMysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('crearusuario', async () => {
    expect(await service.get
      ({name: "franco"})).toEqual(
      {
        id: expect.any(String),
        name: "Franco"
      }
    );
  });

});
