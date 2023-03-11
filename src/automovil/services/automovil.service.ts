import { Injectable } from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';
import { v4 as uuidv4 } from 'uuid';
import { Automovil } from '../entities/automovil.entity';

@Injectable()
export class AutomovilService {

  cars: Automovil[];

  createCar(createAutomovilDto: CreateAutomovilDto): Automovil {
    const car = this.addId(createAutomovilDto);
    
    if(car.client) this.assignCarToClient(car, clientId)

    return car
  }

  getAllCars(): Automovil[] {
    return this.cars;
  }

  getCarById(id: string): Automovil {
    return this.cars.find(car => car.id === id);
  }

  getCarsOnSale(): Automovil[] {
    return this.cars.filter(car => !car.client);
  }

  updateCar(id: string, updateAutomovilDto: UpdateAutomovilDto): Automovil {
    let carToUpdate = this.getCarById(id);
    carToUpdate = {...carToUpdate, ...updateAutomovilDto};
    return carToUpdate
  }

  deleteCar(id: string): Automovil {
    throw new Error('Method not implemented.');
  }

  assignCarToClient(id: string, updateAutomovilDto: UpdateAutomovilDto) {
    throw new Error('Method not implemented.');
  }
  
  unassignCarFromClient(id: string, updateAutomovilDto: UpdateAutomovilDto) {
    throw new Error('Method not implemented.');
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(carObj: CreateAutomovilDto): Automovil {
    const uuid = uuidv4();
    let carWithId = {...carObj, id: uuid}
    return carWithId
  }


  
}
