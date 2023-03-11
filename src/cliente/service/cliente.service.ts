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
    if (createClienteDto.bought_cars) this.assignCarToClient(createdClient.id, createdClient.bought_cars);
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
    clientToUpdate = {...clientToUpdate, ...updateClienteDto}
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

  assignCarToClient(carId: string, clientID: string) {
    throw new Error("Method not implemented.");
  }
  
  unassignCarToClient(carId: string, clientID: string) {
    throw new Error("Method not implemented.");
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(clientObj: CreateClienteDto): Cliente {
    const uuid = uuidv4();
    let clientWithId = {...clientObj, id: uuid}
    return clientWithId
  }
 
}
