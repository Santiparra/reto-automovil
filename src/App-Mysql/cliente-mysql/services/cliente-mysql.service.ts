import { AutomovilMysqlService } from './../../automovil-mysql/services/automovil-mysql.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { Repository } from 'typeorm';
import { ClientMysql } from 'src/App-Mysql/entities/client.entity';
import { Client } from '../interfaces/client.interface';
import { AssignClientToCar } from '../dto/assign-client.dto';

@Injectable()
export class ClienteMysqlService {
    
  private readonly logger = new Logger(ClienteMysqlService.name);

  constructor( 
    @InjectRepository(ClientMysql) private clientsRepo: Repository<ClientMysql>,
    private carsService: AutomovilMysqlService
    ) {}

  createClient(createClienteMysqlDto: CreateClienteMysqlDto): Promise<Client> {
    const newClient = this.clientsRepo.create({
      ...createClienteMysqlDto
    });
    return this.clientsRepo.save(newClient);
  }

  getAllClients(): Promise<Client[]> {
    return this.clientsRepo.find( {relations: ["bought_cars"]} );
  }

  async getClientById(id: string): Promise<Client> {
    const clientExist = await this.clientsRepo.findOne({
      where: {
          id: id
      },
      relations: ["bought_cars"]
    });
    if(!clientExist) throw new HttpException("No hay ningún cliente con esta id", HttpStatus.NOT_FOUND);
    return clientExist;
  }

  async updateClient(id: string, updateClienteMysqlDto: CreateClienteMysqlDto): Promise<Client> {
    const clientExist = await this.getClientById(id);
    if (!clientExist) throw new HttpException("No existe ningún cliente con esta id", HttpStatus.NOT_FOUND);
    const editedClient = Object.assign(clientExist, updateClienteMysqlDto);
    return this.clientsRepo.save(editedClient)
  }

  async deleteClient(id: string): Promise<string> {
    const clientExist =  await this.clientsRepo.delete({ id });
    if (clientExist.affected === 0) throw new HttpException("No hay cliente con esta id", HttpStatus.NOT_FOUND)
    return "El cliente fue borrado con éxito"
  }

  async assignCarToClient(id: string, assignInfo: AssignClientToCar): Promise<Client> {
    const clientFound = await this.getClientById(id);
    if (!clientFound) throw new HttpException("No existe ningún cliente con esta id", HttpStatus.NOT_FOUND);
    const carFound = await this.carsService.getCarById(assignInfo.carId);
    if(!carFound) throw new HttpException("No existe ningún auto con esta id", HttpStatus.BAD_REQUEST);
    clientFound.bought_cars.push(carFound);
    await this.clientsRepo.save(clientFound);
    return clientFound
  }
 
  async unassignCarToClient(id: string, assignInfo: AssignClientToCar): Promise<Client> {
    const clientFound = await this.getClientById(id);
    if (!clientFound) throw new HttpException("No existe ningún cliente con esta id", HttpStatus.NOT_FOUND);
    clientFound.bought_cars = clientFound.bought_cars.filter(car => car.id !== assignInfo.carId);
    await this.clientsRepo.save(clientFound);
    return clientFound
  }

}
