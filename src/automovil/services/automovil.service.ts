import { Injectable } from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';

@Injectable()
export class AutomovilService {

  createCar(createAutomovilDto: CreateAutomovilDto) {
    throw new Error('Method not implemented.');
  }

  getAllCars() {
    throw new Error('Method not implemented.');
  }

  getCarById(id: string) {
    throw new Error('Method not implemented.');
  }

  updateCar(id: string, updateAutomovilDto: UpdateAutomovilDto) {
    throw new Error('Method not implemented.');
  }

  deleteCar(id: string) {
    throw new Error('Method not implemented.');
  }

  assignCarToClient(id: string, updateAutomovilDto: UpdateAutomovilDto) {
    throw new Error('Method not implemented.');
  }
  
  unassignCarFromClient(id: string, updateAutomovilDto: UpdateAutomovilDto) {
    throw new Error('Method not implemented.');
  }
  
}
