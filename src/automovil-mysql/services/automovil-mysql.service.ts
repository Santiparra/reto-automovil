import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarMysql } from 'src/entities/car.entity';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';
import { Repository } from 'typeorm';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';

@Injectable()
export class AutomovilMysqlService {

  constructor( 
    @InjectRepository(CarMysql) private usersRepo: Repository<CarMysql>,
    ) {}

  createCar(createAutomovilMysqlDto: CreateAutomovilMysqlDto) {
    throw new Error('Method not implemented.');
  }

  getAllCars() {
    throw new Error('Method not implemented.');
  }

  getCarById(id: string) {
    throw new Error('Method not implemented.');
  }

  updateCar(id: string, updateAutomovilMysqlDto: UpdateAutomovilMysqlDto) {
    throw new Error('Method not implemented.');
  }

  deleteCar(id: string) {
    throw new Error('Method not implemented.');
  }

  assignCarToClient(assignInfo: SellCarInfo) {
    throw new Error('Method not implemented.');
  }

  unassignCarFromClient(id: string) {
    throw new Error('Method not implemented.');
  }
    
}
