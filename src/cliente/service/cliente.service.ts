import { AutomovilService } from './../../automovil/services/automovil.service';
import { forwardRef, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../interfaces/cliente.interface';
import { Automovil } from 'src/automovil/interfaces/automovil.interface';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';

@Injectable()
export class ClienteService {
            
  constructor (
    @Inject(forwardRef(() => AutomovilService))
    private automovilService: AutomovilService
  ) {}

  clients: Cliente[] = [];
 
  createClient(createClienteDto: CreateClienteDto): Cliente {
    const createdClient = this.addId(createClienteDto);
    createdClient.bought_cars = [];
    this.clients.push(createdClient); 
    return createdClient
  }

  getAllClients(): Cliente[] {
    return this.clients;
  }

  getClientById(uuid: string): Cliente {
    const foundClient = this.clients.find(client => client.id === uuid);
    return foundClient
  }

  updateClient(uuid: string, updateClienteDto: UpdateClienteDto): Cliente {
    let clientToUpdate = this.getClientById(uuid);
    if (!clientToUpdate) throw new HttpException("No hay cliente con esta id", HttpStatus.NOT_FOUND);
    clientToUpdate = {...clientToUpdate, ...updateClienteDto};
    this.replaceClient(clientToUpdate);
    return clientToUpdate
  }

  deleteClient(uuid: string): Cliente {
    const clientToDelete = this.getClientById(uuid);
    if (!clientToDelete) throw new HttpException("No existe cliente con esta id", HttpStatus.NOT_FOUND);
    this.clients = this.clients.filter(client => client.id !== uuid);
    return clientToDelete
  }

  getClientCar(uuid: string): Automovil[] {
    const owner = this.getClientById(uuid);
    if (!owner) throw new HttpException("No hay cliente con esta id", HttpStatus.NOT_FOUND);
    return owner.bought_cars
  }

  assignCarToClient(assignInfo: SellCarInfo): Cliente {
    const newAssign = this.automovilService.assignCarToClient(assignInfo);
    return newAssign.client[0];
  }

  assignCarToNewClient(assignInfo: SellCarInfo): Cliente {
    const buyer = this.getClientById(assignInfo.clientId);
    const car = this.automovilService.getCarById(assignInfo.carId);
    if (!buyer) throw new HttpException("No hay cliente con esta id", HttpStatus.BAD_REQUEST);
    if (!car) throw new HttpException("No hay ningun auto con esta id", HttpStatus.BAD_REQUEST);
    const {client, ...rest} = car
    buyer.bought_cars.push(rest);
    this.replaceClient(buyer);
    return buyer
  }

  unassignCarToClient(carId: string): Automovil {
    const carToSwap = this.automovilService.unassignCarFromClient(carId);
    return carToSwap
  }
  
  unassignCarToClientGlobal(clientID: string, carId: string): Cliente {
    const clientToUnassign = this.getClientById(clientID);
    if (!clientToUnassign) throw new HttpException("No hay cliente con esta id", HttpStatus.NOT_FOUND);
    clientToUnassign.bought_cars = clientToUnassign.bought_cars.filter(car => car.id !== carId);
    this.replaceClient(clientToUnassign);
    return clientToUnassign
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(clientObj: CreateClienteDto): Cliente {
    const uuid = uuidv4();
    let clientWithId = { id: uuid, ...clientObj }
    return clientWithId
  }

  replaceClient(client: Cliente): void {
    const index = this.clients.indexOf( client );
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.clients.splice(index, 1, client)
  }

  handleNewClient(car: Automovil): Cliente {
    let newClient: Cliente = {
      name: car.client[0].name,
      id: uuidv4(),
      bought_cars: [
        {
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          seller: [{
            id: car.seller[0].id,
            name: car.seller[0].name,
            sold_cars: car.seller[0].sold_cars
          }]
        }
      ]   
    }
    this.clients.push(newClient);
    return newClient
  }

  validateClient(name: string): boolean {
    if ( !name || typeof name !== 'string' ) return false;
    if ( name.length > 0 ) return true;
  }

  setSeller(car: Automovil, emptyClientId: string): void {
    const client = this.getClientById(emptyClientId);
    if (!client) throw new HttpException("No hay cliente con esta id", HttpStatus.BAD_REQUEST);
    client.bought_cars = client.bought_cars.filter(cars => cars.id !== car.id)
    client.bought_cars.push(car)
  }

}
