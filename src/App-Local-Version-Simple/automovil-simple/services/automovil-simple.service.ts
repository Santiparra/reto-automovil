import { Injectable, Logger } from '@nestjs/common';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CreateAutomovilSimpleDto } from '../dto/create-automovil-simple.dto';
import { UpdateAutomovilSimpleDto } from '../dto/update-automovil-simple.dto';
import { AutoSimple } from '../interfaces/auto-simple.interface';

@Injectable()
export class AutomovilSimpleService {
  
  private readonly logger = new Logger(AutomovilSimpleService.name);

  autos: AutoSimple[] = [];

  createCar(createAutomovilSimpleDto: CreateAutomovilSimpleDto): AutoSimple {
    throw new Error('Method not implemented.');
  }

  getAllCars(): AutoSimple[] {
    return this.autos;
  }

  getCarsOnSale(): AutoSimple[] {
    throw new Error('Method not implemented.');
  }
  
  getCarById(uuid: string): AutoSimple {
    throw new Error('Method not implemented.');
  }

  updateCar(uuid: string, updateAutomovilDto: UpdateAutomovilSimpleDto): AutoSimple {
    throw new Error('Method not implemented.');
  }

  deleteCar(uuid: string): AutoSimple {
    const autoFound = this.getCarById(uuid);
    this.autos = this.autos.filter(esto => esto.id !== uuid);
    return autoFound;
  }

  assignCarToClient(assignInfo: SellCarInfo): AutoSimple {
    throw new Error('Method not implemented.');
  }

  unassignCarFromClient(uuid: string): AutoSimple {
    throw new Error('Method not implemented.');
  }
  
}
