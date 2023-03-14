import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CarMysql } from 'src/App-Mysql/entities/car.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';
import { Car } from '../interfaces/car.interface';

@Injectable()
export class AutomovilMysqlService {

  constructor( 
    @InjectRepository(CarMysql) private carsRepo: Repository<CarMysql>,
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
      }
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

  assignCarToClient(assignInfo: SellCarInfo) {
    throw new Error('Method not implemented.');
  }

  unassignCarFromClient(id: string) {
    throw new Error('Method not implemented.');
  }
    
}
