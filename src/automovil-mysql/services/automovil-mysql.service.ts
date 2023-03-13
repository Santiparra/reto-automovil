import { Injectable } from '@nestjs/common';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';

@Injectable()
export class AutomovilMysqlService {
  
  create(createAutomovilMysqlDto: CreateAutomovilMysqlDto) {
    return 'This action adds a new automovilMysql';
  }

  findAll() {
    return `This action returns all automovilMysql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} automovilMysql`;
  }

  update(id: number, updateAutomovilMysqlDto: UpdateAutomovilMysqlDto) {
    return `This action updates a #${id} automovilMysql`;
  }

  remove(id: number) {
    return `This action removes a #${id} automovilMysql`;
  }
}
