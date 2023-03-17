import { Injectable, Logger, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { AutomovilSimpleService } from 'src/App-Local-Version-Simple/automovil-simple/services/automovil-simple.service';
import { v4 as uuidv4 } from 'uuid';
import { AsignarCliente } from '../dto/asignar-cliente.dto';
import { CreateClienteSimpleDto } from '../dto/create-cliente-simple.dto';
import { UpdateClienteSimpleDto } from '../dto/update-cliente-simple.dto';
import { ClienteSimple } from '../interfaces/cliente-simple.interface';

@Injectable()
export class ClienteSimpleService {
    
  constructor (
    @Inject(forwardRef(() => AutomovilSimpleService))
    private autosService: AutomovilSimpleService
    ) {}

  private readonly logger = new Logger(ClienteSimpleService.name);

  clientes: ClienteSimple[] = [];
  
  createClient(createClienteSimpleDto: CreateClienteSimpleDto): ClienteSimple {
    const newClient = this.addId(createClienteSimpleDto)
    if (!newClient.bought_cars) newClient.bought_cars = [null]
    this.clientes.push(newClient)
    return newClient
  }

  getAllClients(): ClienteSimple[] {
    return this.clientes;
  }

  getClientById(uuid: string): ClienteSimple {
    const client = this.clientes.find(aquello => aquello.id === uuid);
    if (!client) throw new HttpException("no hay cliente con esta id", HttpStatus.NOT_FOUND)
    return client
  }

  updateClient(uuid: string, updateClienteDto: UpdateClienteSimpleDto): ClienteSimple {
    let clientFound = this.getClientById(uuid);
    if ( !clientFound ) throw new HttpException("Este cliente no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    clientFound = {...clientFound, ...updateClienteDto};
    this.replaceClient(clientFound);    
    return clientFound
  }

  deleteClient(uuid: string): ClienteSimple {
    const clientFound = this.getClientById(uuid);
    if (!clientFound) throw new HttpException("Este cliente no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    this.clientes = this.clientes.filter(esto => esto.id !== uuid);
    return clientFound;
  }

  getClientCar(uuid: string) {    
    const clientFound = this.getClientById(uuid);
    if (!clientFound) throw new HttpException("Este cliente no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    return clientFound.bought_cars
  }

  assignCarToClient(uuid: string, assignInfo: AsignarCliente): ClienteSimple {
    const autoFound = this.autosService.getCarById(assignInfo.carId);
    if (!autoFound) throw new HttpException("Este auto no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    const clientFound = this.getClientById(uuid);
    if (!clientFound) throw new HttpException("Este cliente no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    if (clientFound.bought_cars[0] === null) clientFound.bought_cars = []; 
    clientFound.bought_cars.push(autoFound);
    this.replaceClient(clientFound);
    return clientFound
  }

  unassignCarToClient(uuid: string, unassignInfo: AsignarCliente) {
    const clientFound = this.getClientById(uuid);
    if (!clientFound) throw new HttpException("Este cliente no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    clientFound.bought_cars = clientFound.bought_cars.filter(esto => esto.id !== unassignInfo.carId);
    this.replaceClient(clientFound);
    return clientFound
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(clientObj: CreateClienteSimpleDto): ClienteSimple {
    const uuid = uuidv4();
    let clientWithId = { id: uuid, ...clientObj }
    return clientWithId
  }

  //helper function para mantener el codigo dry
  replaceClient(client: ClienteSimple): void {
    const clientFound = this.getClientById(client.id);
    const index = this.clientes.indexOf(clientFound);
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.clientes.splice(index, 1, client);
  }
 
}
