import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CreateVendedorSimpleDto } from '../dto/create-vendedor-simple.dto';
import { UpdateVendedorSimpleDto } from '../dto/update-vendedor-simple.dto';
import { VendedorSimple } from '../interfaces/vendedor-simple.interface';

@Injectable()
export class VendedorSimpleService {

  private readonly logger = new Logger(VendedorSimpleService.name);

  vendedores: VendedorSimple[] = [];

  createSeller(createVendedorSimpleDto: CreateVendedorSimpleDto): VendedorSimple {
    const newVendedor = this.addId(createVendedorSimpleDto)
    this.vendedores.push(newVendedor)
    return newVendedor
  }

  getAllSellers(): VendedorSimple[] {
    return this.vendedores;
  }

  getSellerById(uuid: string): VendedorSimple {
    const vendedor = this.vendedores.find(aquello => aquello.id === uuid);
    if (!vendedor) throw new HttpException("no hay vendedor con esta id", HttpStatus.NOT_FOUND);
    return vendedor;
  }

  updateSeller(uuid: string, updateVendedorDto: UpdateVendedorSimpleDto): VendedorSimple {
    let sellerFound = this.getSellerById(uuid);
    if ( !sellerFound ) throw new HttpException("Este vendedor no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    sellerFound = {...sellerFound, ...updateVendedorDto};
    this.replaceSeller(sellerFound);    
    return sellerFound
  }

  deleteSeller(uuid: string): VendedorSimple {
    const sellerFound = this.getSellerById(uuid);
    if (!sellerFound) throw new HttpException("Este vendedor no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    this.vendedores = this.vendedores.filter(esto => esto.id !== uuid);
    return sellerFound;
  }

  getSoldCarsBySellerId(uuid: string): VendedorSimple[] {
    throw new Error('Method not implemented.');
  }

  addSoldCar(uuid: string, sellingData: SellCarInfo): VendedorSimple {
    throw new Error('Method not implemented.');
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(vendedorObj: CreateVendedorSimpleDto): VendedorSimple {
    const uuid = uuidv4();
    let vendedorWithId = { id: uuid, ...vendedorObj }
    return vendedorWithId
  }

  //helper function para mantener el codigo dry
  replaceSeller(vendedor: VendedorSimple): void {
    const index = this.vendedores.indexOf(vendedor);
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.vendedores.splice(index, 1, vendedor);
  }

}
