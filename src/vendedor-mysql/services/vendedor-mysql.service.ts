import { Injectable } from '@nestjs/common';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';
import { UpdateVendedorMysqlDto } from '../dto/update-vendedor-mysql.dto';

@Injectable()
export class VendedorMysqlService {
  create(createVendedorMysqlDto: CreateVendedorMysqlDto) {
    return 'This action adds a new vendedorMysql';
  }

  findAll() {
    return `This action returns all vendedorMysql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendedorMysql`;
  }

  update(id: number, updateVendedorMysqlDto: UpdateVendedorMysqlDto) {
    return `This action updates a #${id} vendedorMysql`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendedorMysql`;
  }
}
