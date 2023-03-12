import { ClienteService } from './../../cliente/service/cliente.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';
import { v4 as uuidv4 } from 'uuid';
import { Automovil } from '../entities/automovil.entity';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';

@Injectable()
export class AutomovilService {

  constructor (
    @Inject(forwardRef(() => ClienteService))
    private clienteService: ClienteService,
  ) {}

  cars: Automovil[];

  createCar(createAutomovilDto: CreateAutomovilDto): Automovil {
    const car = this.addId(createAutomovilDto);
    
    //este llamado tiene multiple casos de uso, x ej si no existe aun el cliente
    //y a su vez si el cliente existe crear la referencia en la otra entidad 
    if(car.client) {
      const data: SellCarInfo = {carId: car.id, clientId: car.client[0].id}
      this.assignCarToClient(data);
    }
    this.cars.push(car)
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
    this.replaceCar(carToUpdate);
    return carToUpdate
  }

  deleteCar(id: string): Automovil {
    const carToDelete = this.getCarById(id);
    this.cars = this.cars.filter(car => car.id !== id);
    return carToDelete
  }

  //falta implementar o notambien la relacion al metodo en el servicio vendedor
  assignCarToClient(assignInfo: SellCarInfo): Automovil {
    let buyer = this.clienteService.getClientById(assignInfo.clientId);
    const car = this.getCarById(assignInfo.carId)
    //por comodidad si no existe el cliente aca lo creamos, podriamos tirar error tambien
    
    if(!buyer) buyer = this.clienteService.createClient(car.client[0]);

    this.clienteService.assignCarToClient(assignInfo);
    car.client = [buyer];

    const carExist = this.getCarById(car.id)

    //si la llamada viene del controlador, o sea, el auto ya existe 

    if(carExist) {
      this.replaceCar(car);
      return car
    }

    //si es un callback al crear el auto lo devolvemos para que pushee

    return car
  }
  
 /*  se que no es necesario pero aca agregue un parametro para verificar si es una devolucion
  si es una devolucion simplemente quito al cliente
  de lo contrario asigo al antiguo comprador como actual vendedor */

  
  unassignCarFromClient(carId: string, devolucion: boolean): Automovil {
    const carToSwap = this.getCarById(carId);
    if (devolucion === true) {
      carToSwap.client = null;
      this.replaceCar(carToSwap);
      return carToSwap
    }
    //aca te quedaste, revisa la logica xfa
    carToSwap.seller[0].id = carToSwap.client[0].id;
    carToSwap.seller[0].name = carToSwap.client[0].name;
    carToSwap.seller[0].sold_cars = carToSwap.client[0].sold_cars;
    carToSwap.client = null;
    }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(carObj: CreateAutomovilDto): Automovil {
    const uuid = uuidv4();
    let carWithId = {...carObj, id: uuid}
    return carWithId
  }

  //helper function para mantener el codigo dry
  replaceCar(car: Automovil): void {
    const index = this.cars.indexOf(car);
    this.cars.splice(index, 1, car);
  }
}
