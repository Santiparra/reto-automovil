import { Injectable } from '@nestjs/common';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { UpdateClienteMysqlDto } from '../dto/update-cliente-mysql.dto';

@Injectable()
export class ClienteMysqlService {
  create(createClienteMysqlDto: CreateClienteMysqlDto) {
    return 'This action adds a new clienteMysql';
  }

  findAll() {
    return `This action returns all clienteMysql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clienteMysql`;
  }

  update(id: number, updateClienteMysqlDto: UpdateClienteMysqlDto) {
    return `This action updates a #${id} clienteMysql`;
  }

  remove(id: number) {
    return `This action removes a #${id} clienteMysql`;
  }
}
