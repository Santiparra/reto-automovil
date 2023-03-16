import { SellCarDto } from './../dto/sell-car.dto';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarMysql } from 'src/App-Mysql/entities/car.entity';
import { ClientMysql } from 'src/App-Mysql/entities/client.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AssignCarToClient } from '../dto/assign-car.dto';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';
import { Car } from '../interfaces/car.interface';
import { SellerMysql } from 'src/App-Mysql/entities/seller.entity';

@Injectable()
export class AutomovilMysqlService {
  
  private readonly logger = new Logger(AutomovilMysqlService.name);

  constructor( 
    @InjectRepository(ClientMysql) private clientsRepo: Repository<ClientMysql>,
    @InjectRepository(CarMysql) private carsRepo: Repository<CarMysql>,
    @InjectRepository(SellerMysql) private sellersRepo: Repository<SellerMysql>
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
    const carExist = await this.carsRepo.findOne({
      where: {
          id
      }
    });  
    if (!carExist) throw new HttpException("No existe ningún auto con esta id", HttpStatus.NOT_FOUND);
    const finalObject = Object.assign(carExist, updateAutomovilMysqlDto);
    return this.carsRepo.save(finalObject)
  }

  async deleteCar(id: string): Promise<DeleteResult> {
    const carExist =  await this.carsRepo.delete({ id });
    if (carExist.affected === 0) throw new HttpException("No hay auto con esta id", HttpStatus.NOT_FOUND)
    return carExist.raw
  }

  async assignCarToClient(id: string, assignInfo: AssignCarToClient): Promise<Car> {
    const carFound = await this.getCarById(id);
    const clientFound = await this.clientsRepo.findOne({
      where: {
          id: assignInfo.clientId
      }
    });
     carFound.client = clientFound;
     return this.carsRepo.save(carFound);     
  }

  async unassignCarFromClient(id: string): Promise<Car> {
    const carFound = await this.getCarById(id);
    carFound.client = null;
    return this.carsRepo.save(carFound)
  }
      
}
