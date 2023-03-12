import { AutomovilService } from './../../automovil/services/automovil.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../entities/cliente.entity';
import { Automovil } from 'src/automovil/entities/automovil.entity';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';

@Injectable()
export class ClienteService {
    
  constructor (
    @Inject(forwardRef(() => AutomovilService))
    private automovilService: AutomovilService
  ) {}

  clients: Cliente[] = [];
 
  createClient(createClienteDto: CreateClienteDto): Cliente {
    let createdClient = this.addId(createClienteDto);
   // if (createClienteDto.bought_cars) this.assignCarToClient(createdClient.id, createdClient.bought_cars);
   this.clients.push(createdClient); 
   return createdClient
  }

  getAllClients(): Cliente[] {
    return this.clients;
  }

  getClientById(uuid: string): Cliente {
    return this.clients.find(client => client.id === uuid);
  }

  updateClient(uuid: string, updateClienteDto: UpdateClienteDto): Cliente {
    let clientToUpdate = this.getClientById(uuid);
    clientToUpdate = {...clientToUpdate, ...updateClienteDto};
    this.replaceClient(clientToUpdate);
    return clientToUpdate
  }

  deleteClient(uuid: string): Cliente {
    const clientToDelete = this.getClientById(uuid);
    this.clients = this.clients.filter(client => client.id !== uuid);
    return clientToDelete
  }

  getClientCar(uuid: string): Automovil[] {
    const owner = this.getClientById(uuid);
    return owner.bought_cars
  }

  assignCarToClient(assignInfo: SellCarInfo): Cliente {
    const buyer = this.getClientById(assignInfo.clientId);
    const car = this.automovilService.getCarById(assignInfo.carId);
    const {client, ...rest} = car
    buyer.bought_cars = [rest];
    this.replaceClient(buyer);
    return buyer
  }
  
  unassignCarToClient(clientID: string): Cliente {
    const clientToUnassign = this.getClientById(clientID);
    clientToUnassign.bought_cars.splice(0, clientToUnassign.bought_cars.length);
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

}
