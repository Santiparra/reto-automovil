
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { Repository } from 'typeorm';
import { ClientMysql } from 'src/entities/client.entity';

@Injectable()
export class ClienteMysqlService {

  constructor( 
    @InjectRepository(ClientMysql) private usersRepo: Repository<ClientMysql>,
    ) {}

  createClient(createClienteMysqlDto: CreateClienteMysqlDto) {
    throw new Error('Method not implemented.');
  }

  getAllClients() {
    throw new Error('Method not implemented.');
  }

  getClientById(id: string) {
    throw new Error('Method not implemented.');
  }

  updateClient(id: string, updateClienteMysqlDto: CreateClienteMysqlDto) {
    throw new Error('Method not implemented.');
  }

  deleteClient(id: string) {
    throw new Error('Method not implemented.');
  }

  assignCarToClient(assignInfo: SellCarInfo) {
    throw new Error('Method not implemented.');
  }

  unassignCarToClient(id: string) {
    throw new Error('Method not implemented.');
  }

}
