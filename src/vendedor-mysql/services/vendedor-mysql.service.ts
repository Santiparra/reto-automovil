import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerMysql } from 'src/entities/seller.entity';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';
import { Repository } from 'typeorm';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';

@Injectable()
export class VendedorMysqlService {

  constructor( 
    @InjectRepository(SellerMysql) private usersRepo: Repository<SellerMysql>,
    ) {}

  createVendedor(createVendedorMysqlDto: CreateVendedorMysqlDto) {
    throw new Error('Method not implemented.');
  }

  getAllSellers() {
    throw new Error('Method not implemented.');
  }

  getSellerById(id: string) {
    throw new Error('Method not implemented.');
  }

  updateSeller(id: string, updateVendedorMysqlDto: CreateVendedorMysqlDto) {
    throw new Error('Method not implemented.');
  }

  deleteSeller(id: string) {
    throw new Error('Method not implemented.');
  }

  getSoldCarsBySellerId(id: string) {
    throw new Error('Method not implemented.');
  }
  
  addSoldCar(id: string, sellingData: SellCarInfo) {
    throw new Error('Method not implemented.');
  } 
 
}
