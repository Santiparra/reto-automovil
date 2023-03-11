import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

@Injectable()
export class ClienteService {
 
  createClient(createClienteDto: CreateClienteDto) {
    throw new Error("Method not implemented.");
  }

  getAllClients() {
    throw new Error("Method not implemented.");
  }

  getClientById(uuid: string) {
    throw new Error("Method not implemented.");
  }

  updateClient(uuid: string, updateClienteDto: UpdateClienteDto) {
    throw new Error("Method not implemented.");
  }

  deleteClient(uuid: string) {
    throw new Error("Method not implemented.");
  }

  getClientCar(uuid: string) {
    throw new Error("Method not implemented.");
  }

  assignCarToClient(uuid: string, updateClienteDto: UpdateClienteDto) {
    throw new Error("Method not implemented.");
  }
  
  unassignCarToClient(uuid: string, updateClienteDto: UpdateClienteDto) {
    throw new Error("Method not implemented.");
  }
 
}
