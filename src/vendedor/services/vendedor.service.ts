import { Injectable } from '@nestjs/common';
import { CreateVendedorDto } from '../dto/create-vendedor.dto';
import { UpdateVendedorDto } from '../dto/update-vendedor.dto';

@Injectable()
export class VendedorService {

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
  
}
