import { AddSaleDto } from './../dto/add-sale.dto';
import { AutomovilMysqlService } from './../../automovil-mysql/services/automovil-mysql.service';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellerMysql } from 'src/App-Mysql/entities/seller.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';
import { Seller } from '../interfaces/seller.interface';

@Injectable()
export class VendedorMysqlService {

  private readonly logger = new Logger(VendedorMysqlService.name);

  constructor( 
    @InjectRepository(SellerMysql) private sellersRepo: Repository<SellerMysql>,
    private carsService: AutomovilMysqlService,
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
      },
      relations: ["sold_cars"]
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

  async getSoldCarsBySellerId(id: string) {
    const sellerFound = await this.getSellerById(id);
    return sellerFound.sold_cars;
  }
  
  async addSoldCar(id: string, sellingData: AddSaleDto) {
    const sellerFound = await this.getSellerById(id);
    const carFound = await this.carsService.getCarById(sellingData.carId);
    sellerFound.sold_cars.push(carFound);
    await this.sellersRepo.save(sellerFound);
    return sellerFound
  } 
 
}
