import { VendedorService } from './../../vendedor/services/vendedor.service';
import { ClienteService } from './../../cliente/service/cliente.service';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    @Inject(forwardRef(() => VendedorService))
    private vendedorService: VendedorService
  ) {}

  cars: Automovil[] = [];

  createCar(createAutomovilDto: CreateAutomovilDto): Automovil {
    /* NOTA IMPORTANTE: no estoy seguro de si deberia implementar esta funcion o no,
    mas alla de que podria acortarla y eso, no creo que sea buena idea crear 3 entidades
    desde una sola funcion, la hice porque me colgó y a modo de ejercitar logica.
    Es evidente que en vez de crear entidades podria tirar error simplemente  */

    const car = this.addId(createAutomovilDto);

    //nuevamente verificamos si el cliente existe y si no lo validamos y creamos
    if(car.client) {
      const clientFound = this.clienteService.getClientById(car.client[0].id); 
      if ( !clientFound && this.clienteService.validateClient(car.client[0].name) === true) {
        const newClient = this.clienteService.handleNewClient(car);
        car.client[0].id = newClient.id;
      }
    } 
    
    //revisa si el seller esta bien y existe. Si no existe lo creo en el otro modulo
    const sellerFound = this.vendedorService.getSellerById(car.seller[0].id);
    falta esta pieza de logica
    //if (sellerFound) this.vendedorService.addSoldCar(sellerFound.id)
    if ( !sellerFound && this.vendedorService.validateSeller(car.seller[0].name) === true) {
       const newSeller = this.vendedorService.handleNewSeller(car);
       car.seller[0].id = newSeller.id;
    };    
    
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

  assignCarToClient(assignInfo: SellCarInfo): Automovil {
    let buyer = this.clienteService.getClientById(assignInfo.clientId);
    const car = this.getCarById(assignInfo.carId);
        
    if(!car) throw new HttpException("Este auto no existe", HttpStatus.NOT_FOUND);
    if(!buyer) throw new HttpException("Este cliente no existe", HttpStatus.NOT_FOUND);

    car.client.splice(0, car.client.length);
    car.client[0] = {id: buyer.id, name: buyer.name};  
    this.replaceCar(car);

    this.clienteService.assignCarToClient(assignInfo);
    return car
  }
  
 /*  se que no es necesario pero aca agregue un parametro para verificar si es una devolucion
  si es una devolucion simplemente quito al cliente
  de lo contrario asigo al antiguo comprador como actual vendedor */

  ///refacttoriza esto
  unassignCarFromClient(carId: string): Automovil {
    const carToSwap = this.getCarById(carId);
    if (!carToSwap) throw new HttpException("el auto no existe", HttpStatus.NOT_FOUND)
    this.clienteService.unassignCarToClient(carToSwap.client[0].id);
    this.vendedorService.unassignCarFromSeller(carToSwap);
    carToSwap.client = null;
    this.replaceCar(carToSwap);
    return carToSwap
    }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(carObj: CreateAutomovilDto): Automovil {
    const uuid = uuidv4();
    let carWithId = { id: uuid, ...carObj }
    return carWithId
  }

  //helper function para mantener el codigo dry
  replaceCar(car: Automovil): void {
    const index = this.cars.indexOf(car);
    this.cars.splice(index, 1, car);
  }
}
