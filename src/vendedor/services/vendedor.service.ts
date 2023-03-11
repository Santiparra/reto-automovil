import { Injectable } from '@nestjs/common';
import { CreateVendedorDto } from '../dto/create-vendedor.dto';
import { UpdateVendedorDto } from '../dto/update-vendedor.dto';
import { Vendedor } from '../entities/vendedor.entity';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class VendedorService {

  sellers: Vendedor[];

  createSeller(createVendedorDto: CreateVendedorDto) {
    throw new Error("Method not implemented.");
  }

  getAllSellers() {
    throw new Error("Method not implemented.");
  }

  getSellerById(uuid: string) {
    throw new Error("Method not implemented.");
  }

  updateSeller(uuid: string, updateVendedorDto: UpdateVendedorDto) {
    throw new Error("Method not implemented.");
  }

  deleteSeller(id: string) {
    throw new Error("Method not implemented.");
  }

  getSoldCarsBySellerId(uuid: string) {
    throw new Error("Method not implemented.");
  }
  
  addSoldCar(uuid: string, createVendedorDto: CreateVendedorDto) {
    throw new Error("Method not implemented.");
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(sellerObj: CreateVendedorDto): Vendedor {
    const uuid = uuidv4();
    let sellerWithId = {...sellerObj, id: uuid}
    return sellerWithId
  }
  
}
