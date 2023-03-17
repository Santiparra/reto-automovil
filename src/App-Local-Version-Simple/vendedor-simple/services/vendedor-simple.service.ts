import { Injectable, Logger } from '@nestjs/common';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CreateVendedorSimpleDto } from '../dto/create-vendedor-simple.dto';
import { UpdateVendedorSimpleDto } from '../dto/update-vendedor-simple.dto';
import { VendedorSimple } from '../interfaces/vendedor-simple.interface';

@Injectable()
export class VendedorSimpleService {

  private readonly logger = new Logger(VendedorSimpleService.name);

  vendedores: VendedorSimple[] = [];

  createSeller(createVendedorSimpleDto: CreateVendedorSimpleDto): VendedorSimple {
    throw new Error('Method not implemented.');
  }

  getAllSellers(): VendedorSimple[] {
    return this.vendedores;
  }

  getSellerById(uuid: string): VendedorSimple {
    throw new Error('Method not implemented.');
  }

  updateSeller(uuid: string, updateVendedorDto: UpdateVendedorSimpleDto): VendedorSimple {
    throw new Error('Method not implemented.');
  }

  deleteSeller(uuid: string): VendedorSimple {
    throw new Error('Method not implemented.');
  }

  getSoldCarsBySellerId(uuid: string): VendedorSimple[] {
    throw new Error('Method not implemented.');
  }

  addSoldCar(uuid: string, sellingData: SellCarInfo): VendedorSimple {
    throw new Error('Method not implemented.');
  }

}
