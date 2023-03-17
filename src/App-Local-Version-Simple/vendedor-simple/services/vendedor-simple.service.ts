import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AutomovilSimpleService } from 'src/App-Local-Version-Simple/automovil-simple/services/automovil-simple.service';
import { v4 as uuidv4 } from 'uuid';
import { AgregarVenta } from '../dto/agregar-venta.dto';
import { CreateVendedorSimpleDto } from '../dto/create-vendedor-simple.dto';
import { UpdateVendedorSimpleDto } from '../dto/update-vendedor-simple.dto';
import { VendedorSimple } from '../interfaces/vendedor-simple.interface';

@Injectable()
export class VendedorSimpleService {
    
  constructor (
    
    private autosService: AutomovilSimpleService
    ) {}

  private readonly logger = new Logger(VendedorSimpleService.name);

  vendedores: VendedorSimple[] = [];

  createSeller(createVendedorSimpleDto: CreateVendedorSimpleDto): VendedorSimple {
    const newVendedor = this.addId(createVendedorSimpleDto);
    if (!newVendedor.sold_cars) newVendedor.sold_cars = [null]
    this.vendedores.push(newVendedor);
    return newVendedor
  }

  getAllSellers(): VendedorSimple[] {
    return this.vendedores;
  }

  getSoldCarsBySellerId(uuid: string) {
    const sellerFound = this.getSellerById(uuid);
    if ( !sellerFound ) throw new HttpException("Este vendedor no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    return sellerFound.sold_cars
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

  addSoldCar(uuid: string, sellingData: AgregarVenta) {
    const autoFound = this.autosService.getCarById(sellingData.carId);
    if (!autoFound) throw new HttpException("Este auto no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    const sellerFound = this.getSellerById(uuid);
    if (!sellerFound) throw new HttpException("Este cliente no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    autoFound.seller = [null];
    if (sellerFound.sold_cars[0] === null) sellerFound.sold_cars = []; 
    sellerFound.sold_cars.push(autoFound);
    this.replaceSeller(sellerFound);
    return sellerFound
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(vendedorObj: CreateVendedorSimpleDto): VendedorSimple {
    const uuid = uuidv4();
    let vendedorWithId = { id: uuid, ...vendedorObj }
    return vendedorWithId
  }

  //helper function para mantener el codigo dry
  replaceSeller(vendedor: VendedorSimple): void {
    const vendedorFound = this.getSellerById(vendedor.id)
    const index = this.vendedores.indexOf(vendedorFound);
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.vendedores.splice(index, 1, vendedor);
  }

}
