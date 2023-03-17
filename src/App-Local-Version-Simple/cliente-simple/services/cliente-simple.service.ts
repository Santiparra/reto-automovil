import { Injectable, Logger } from '@nestjs/common';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CreateClienteSimpleDto } from '../dto/create-cliente-simple.dto';
import { UpdateClienteSimpleDto } from '../dto/update-cliente-simple.dto';
import { ClienteSimple } from '../interfaces/cliente-simple.interface';

@Injectable()
export class ClienteSimpleService {

  private readonly logger = new Logger(ClienteSimpleService.name);

  clientes: ClienteSimple[] = [];
  
  createClient(createClienteSimpleDto: CreateClienteSimpleDto): ClienteSimple {
    throw new Error('Method not implemented.');
  }

  getAllClients(): ClienteSimple[] {
    return this.clientes;
  }

  getClientById(uuid: string): ClienteSimple {
    throw new Error('Method not implemented.');
  }

  updateClient(uuid: string, updateClienteDto: UpdateClienteSimpleDto): ClienteSimple {
    throw new Error('Method not implemented.');
  }

  deleteClient(uuid: string): ClienteSimple {
    throw new Error('Method not implemented.');
  }

  getClientCar(uuid: string) {
    throw new Error('Method not implemented.');
  }

  assignCarToClient(assignInfo: SellCarInfo): ClienteSimple {
    throw new Error('Method not implemented.');
  }

  unassignCarToClient(uuid: string): ClienteSimple {
    throw new Error('Method not implemented.');
  }
 
}
