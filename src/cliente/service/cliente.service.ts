import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../entities/cliente.entity';
import { Automovil } from 'src/automovil/entities/automovil.entity';

@Injectable()
export class ClienteService {

  clients: Cliente[];
 
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

  assignCarToClient(car: Automovil, clientId: string): Cliente {
    const buyer = this.getClientById(clientId);
    buyer.bought_cars = [car];
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
    let clientWithId = {...clientObj, id: uuid}
    return clientWithId
  }

  replaceClient(client: Cliente): void {
    const index = this.clients.indexOf( client );
    this.clients.splice(index, 1, client)
  }
 
}
