import { Injectable } from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';

@Injectable()
export class AutomovilService {
  create(createAutomovilDto: CreateAutomovilDto) {
    return 'This action adds a new automovil';
  }

  findAll() {
    return `This action returns all automovil`;
  }

  findOne(id: number) {
    return `This action returns a #${id} automovil`;
  }

  update(id: number, updateAutomovilDto: UpdateAutomovilDto) {
    return `This action updates a #${id} automovil`;
  }

  remove(id: number) {
    return `This action removes a #${id} automovil`;
  }
}
