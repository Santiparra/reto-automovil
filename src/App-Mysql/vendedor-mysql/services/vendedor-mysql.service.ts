import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { SellerMysql } from 'src/App-Mysql/entities/seller.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';
import { Seller } from '../interfaces/seller.interface';

@Injectable()
export class VendedorMysqlService {

  constructor( 
    @InjectRepository(SellerMysql) private sellersRepo: Repository<SellerMysql>,
    ) {}

  createVendedor(createVendedorMysqlDto: CreateVendedorMysqlDto): Promise<Seller> {
    const newSeller = this.sellersRepo.create({
      ...createVendedorMysqlDto
    });
    return this.sellersRepo.save(newSeller);
  }

  getAllSellers(): Promise<Seller[]> {
    return this.sellersRepo.find( {relations: ["sold_cars"]} );
  }

  async getSellerById(id: string): Promise<Seller> {
    const sellerExist = await this.sellersRepo.findOne({
      where: {
          id: id
      }
    });
    if(!sellerExist) throw new HttpException("No existe ningún vendedor con esta id", HttpStatus.NOT_FOUND);
    return sellerExist;
  }

  async updateSeller(id: string, updateVendedorMysqlDto: CreateVendedorMysqlDto): Promise<Seller> {
    const sellerExist = await this.sellersRepo.findOne({
      where: {
          id
      }
    });  
    if (!sellerExist) throw new HttpException("No existe ningún vendedor con esta id", HttpStatus.NOT_FOUND);
    const newSeller = Object.assign(sellerExist, updateVendedorMysqlDto);
    return this.sellersRepo.save(newSeller)
  }  

  async deleteSeller(id: string): Promise<DeleteResult> {
    const sellerExist =  await this.sellersRepo.delete({ id });
    if (sellerExist.affected === 0) throw new HttpException("No hay auto con esta id", HttpStatus.NOT_FOUND);
    return sellerExist
  }

  getSoldCarsBySellerId(id: string) {
    throw new Error('Method not implemented.');
  }
  
  addSoldCar(id: string, sellingData: SellCarInfo) {
    throw new Error('Method not implemented.');
  } 
 
}
