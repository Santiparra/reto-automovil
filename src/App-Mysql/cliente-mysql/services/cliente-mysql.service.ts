import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { Repository, DeleteResult } from 'typeorm';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { ClientMysql } from 'src/App-Mysql/entities/client.entity';
import { Client } from '../interfaces/client.interface';

@Injectable()
export class ClienteMysqlService {

  constructor( 
    @InjectRepository(ClientMysql) private clientsRepo: Repository<ClientMysql>,
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
      }
    });
    if(!clientExist) throw new HttpException("No hay ningún cliente con esta id", HttpStatus.NOT_FOUND);
    return clientExist;
  }

  async updateClient(id: string, updateClienteMysqlDto: CreateClienteMysqlDto): Promise<Client> {
    const clientExist = await this.clientsRepo.findOne({
      where: {
          id
      }
    });  
    if (!clientExist) throw new HttpException("No existe ningún cliente con esta id", HttpStatus.NOT_FOUND);
    const finalObject = Object.assign(clientExist, updateClienteMysqlDto);
    return this.clientsRepo.save(finalObject)
  }

  async deleteClient(id: string): Promise<DeleteResult> {
    const clientExist =  await this.clientsRepo.delete({ id });
    if (clientExist.affected === 0) throw new HttpException("No hay cliente con esta id", HttpStatus.NOT_FOUND)
    return clientExist
  }

  assignCarToClient(assignInfo: SellCarInfo) {
    throw new Error('Method not implemented.');
  }

  unassignCarToClient(id: string) {
    throw new Error('Method not implemented.');
  }

}
