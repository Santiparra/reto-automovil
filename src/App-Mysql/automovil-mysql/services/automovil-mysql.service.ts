import { ClienteMysqlService } from './../../cliente-mysql/services/cliente-mysql.service';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarMysql } from 'src/App-Mysql/entities/car.entity';
import { Repository } from 'typeorm';
import { AssignCarToClient } from '../dto/assign-car.dto';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';
import { Car } from '../interfaces/car.interface';

@Injectable()
export class AutomovilMysqlService {
  
  private readonly logger = new Logger(AutomovilMysqlService.name);

  constructor( 
    @InjectRepository(CarMysql) private carsRepo: Repository<CarMysql>,
    @Inject(forwardRef(() => ClienteMysqlService))
    private clientService: ClienteMysqlService,
    ) {}
    
  createCar(createAutomovilMysqlDto: CreateAutomovilMysqlDto): Promise<Car> {
    const newCar = this.carsRepo.create({
        ...createAutomovilMysqlDto
    });
    return this.carsRepo.save(newCar);
  }

  getAllCars(): Promise<Car[]>  {
      return this.carsRepo.find( {relations: ["seller", "client"]} );
  }

  async getCarById(id: string): Promise<Car> {
    const carExist = await this.carsRepo.findOne({
      where: {
          id: id
      },
      relations: ["seller", "client"]
    });
    if(!carExist) throw new HttpException("No existe ningún auto con esta id", HttpStatus.NOT_FOUND);
    return carExist;
  }

  async updateCar(id: string, updateAutomovilMysqlDto: UpdateAutomovilMysqlDto): Promise<Car> {
    const carExist = await this.getCarById(id);
    if (!carExist) throw new HttpException("No existe ningún auto con esta id", HttpStatus.NOT_FOUND);
    const newCar = Object.assign(carExist, updateAutomovilMysqlDto);
    return this.carsRepo.save(newCar)
  }

  async deleteCar(id: string): Promise<string> {
    const carExist =  await this.carsRepo.delete({ id });
    if (carExist.affected === 0) throw new HttpException("No hay auto con esta id", HttpStatus.NOT_FOUND)
    return "El auto fue borrado con exito"
  }

  async assignCarToClient(id: string, assignInfo: AssignCarToClient): Promise<Car> {
    const carFound = await this.getCarById(id);
    if(!carFound) throw new HttpException("No existe ningún auto con esta id", HttpStatus.NOT_FOUND);
    const clientFound = await this.clientService.getClientById(assignInfo.clientId);
    if (!clientFound) throw new HttpException("No hay ningún cliente con esta id", HttpStatus.BAD_REQUEST);
    carFound.client = clientFound;
    return this.carsRepo.save(carFound);     
  }

  async unassignCarFromClient(id: string): Promise<Car> {
    const carFound = await this.getCarById(id);
    if(!carFound) throw new HttpException("No existe ningún auto con esta id", HttpStatus.NOT_FOUND);
    carFound.client = null;
    return this.carsRepo.save(carFound)
  }
      
}
