import { VendedorService } from './../../vendedor/services/vendedor.service';
import { ClienteService } from './../../cliente/service/cliente.service';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';
import { v4 as uuidv4 } from 'uuid';
import { Automovil } from '../interfaces/automovil.interface';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';

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
        if (!newClient) throw new HttpException(
          "Lo sentimos no existe cliente con esta id y los datos no son suficientes como para crearlo",
          HttpStatus.BAD_REQUEST);
        car.client[0].id = newClient.id;
      }      
    } 
    
    //revisa si el seller esta bien y existe. Si no existe lo creo en el otro modulo
    const sellerFound = this.vendedorService.getSellerById(car.seller[0].id);     
    if ( !sellerFound && this.vendedorService.validateSeller(car.seller[0].name) === true) {
       const newSeller = this.vendedorService.handleNewSeller(car);
       if (!newSeller) throw new HttpException(
        "Lo sentimos no existe vendedor con esta id y los datos no son suficientes como para crearlo",
        HttpStatus.BAD_REQUEST);
        car.seller[0].id = newSeller.id;
       if (car.client) this.clienteService.setSeller(car, car.client[0].id);
    };    
    if(!car.client) car.client = [null]
    this.cars.push(car);    
    if (sellerFound && car.client) {      
      const sellInfo: SellCarInfo = { carId: car.id, clientId: car.client[0].id };
      this.vendedorService.addSoldCar(sellerFound.id, sellInfo)
    }
    return car
  }

  getAllCars(): Automovil[] {
    return this.cars;
  }

  getCarById(id: string): Automovil {
    const foundCar = this.cars.find(car => car.id === id);
    return foundCar
  }

  getCarsOnSale(): Automovil[] {
    return this.cars.filter(car => !car.client || car.client[0] === null);
  }

  updateCar(id: string, updateAutomovilDto: UpdateAutomovilDto): Automovil {
    let carToUpdate = this.getCarById(id);
    if (!carToUpdate) throw new HttpException(
      "Lo sentimos no existe automovil con esta id",
      HttpStatus.NOT_FOUND);
    carToUpdate = {...carToUpdate, ...updateAutomovilDto};
    this.replaceCar(carToUpdate);
    return carToUpdate
  }

  deleteCar(id: string): Automovil {
    const carToDelete = this.getCarById(id);
    if (!carToDelete) throw new HttpException(
      "No tenemos ningun automovil registrado con esta id",
      HttpStatus.NOT_FOUND);
    this.cars = this.cars.filter(car => car.id !== id);
    return carToDelete
  }

  assignCarToClient(assignInfo: SellCarInfo): Automovil {
    let buyer = this.clienteService.getClientById(assignInfo.clientId);
    const car = this.getCarById(assignInfo.carId);        
    if(!car) throw new HttpException("Este auto no existe", HttpStatus.NOT_FOUND);
    if(!buyer) throw new HttpException("Este cliente no existe", HttpStatus.NOT_FOUND);
    car.client = [];
    car.client[0] = {id: buyer.id, name: buyer.name};  
    this.replaceCar(car);
    this.clienteService.assignCarToNewClient(assignInfo);
    this.vendedorService.addSoldCar(car.seller[0].id, assignInfo);
    return car
  }
  
 /*  se que no es necesario pero aca agregue un parametro para verificar si es una devolucion
  si es una devolucion simplemente quito al cliente
  de lo contrario asigo al antiguo comprador como actual vendedor */

  unassignCarFromClient(carId: string): Automovil {
    const carToSwap = this.getCarById(carId);
    if (!carToSwap) throw new HttpException("el auto no existe", HttpStatus.NOT_FOUND)
    this.clienteService.unassignCarToClientGlobal(carToSwap.client[0].id, carId);
    this.vendedorService.unassignCarFromSeller(carToSwap);
    carToSwap.client = [null];
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
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.cars.splice(index, 1, car);
  }
}
