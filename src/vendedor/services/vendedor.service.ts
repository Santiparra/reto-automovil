import { SellCarInfo } from './../dto/sell-car.dto';
import { AutomovilService } from './../../automovil/services/automovil.service';
import { ClienteService } from './../../cliente/service/cliente.service';
import { AutomovilInfoBasica } from './../../automovil/interfaces/car-basic-info.interface';
import { Vendedor } from '../interfaces/vendedor.interface';
import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateVendedorDto } from '../dto/create-vendedor.dto';
import { UpdateVendedorDto } from '../dto/update-vendedor.dto';
import { v4 as uuidv4 } from 'uuid';
import { Automovil } from 'src/automovil/interfaces/automovil.interface';


@Injectable()
export class VendedorService {
      
  constructor (
    @Inject(forwardRef(() => ClienteService))
    private clientService: ClienteService,
    @Inject(forwardRef(() => AutomovilService))
    private automovilService: AutomovilService,
  ) {}

  sellers: Vendedor[] = [];

  createSeller(createVendedorDto: CreateVendedorDto): Vendedor {
    const newSeller = this.addId(createVendedorDto);
    newSeller.sold_cars = [];
    this.sellers.push(newSeller);
    return newSeller
  }

  getAllSellers(): Vendedor[] {
    return this.sellers;
  }

  getSellerById(uuid: string): Vendedor {
    const foundSeller = this.sellers.find(seller => seller.id === uuid);
    return foundSeller
  }

  updateSeller(uuid: string, updateVendedorDto: UpdateVendedorDto): Vendedor {
    let changedSeller = this.getSellerById(uuid);
    if (!changedSeller)  {
      throw new HttpException(
        "No hay ningun vendedor con esta id", 
        HttpStatus.NOT_FOUND)
    };
    changedSeller = {...changedSeller, ...updateVendedorDto};
    this.replaceSeller(changedSeller);
    return changedSeller
  }

  deleteSeller(id: string): Vendedor {
    const sellerToDelete = this.getSellerById(id);
    if (!sellerToDelete)  {
      throw new HttpException(
        "No hay ningun vendedor con esta id en nuestra base de datos", 
        HttpStatus.NOT_FOUND)
    };
    this.sellers = this.sellers.filter(seller => seller.id !== id);
    return sellerToDelete
  }

  /* Se que esto no es la solucion mas elegante;
  no se si es estrictamente necesario pero me parece redundante devolver la informacion 
  del vendedor 2 veces asi que cree un dto aparte pero tambien podria haber hecho un 
  interceptor o poner que la propiedad vendedor fuese opcional en automovil */
  getSoldCarsBySellerId(uuid: string): AutomovilInfoBasica[] {
    const sellerFound = this.getSellerById(uuid);
    if (!sellerFound) {
      throw new HttpException(
        "No hay ningun vendedor con esta id", 
        HttpStatus.NOT_FOUND)
    };
    let cleanInfo: AutomovilInfoBasica[] = [];
    sellerFound.sold_cars.forEach(sold_car => {
      const { seller, ...rest } = sold_car;
      cleanInfo.push(rest);
    });
    return cleanInfo
  }
     
  addSoldCar(uuid: string, info: SellCarInfo): Vendedor {
    const car = this.automovilService.getCarById(info.carId);    
    if (!car)  {
      throw new HttpException(
        "No hay ningun automovil con esta id", 
        HttpStatus.BAD_REQUEST)
    };
    const seller = this.getSellerById(uuid);
    if (!seller)  {
      throw new HttpException(
        "No hay ningun vendedor con esta id", 
        HttpStatus.NOT_FOUND)
    };
    car.seller[0].id = uuid;
    car.seller[0].name = seller.name;
    this.clientService.setSeller(car, info.clientId);
    seller.sold_cars.push(car);
    this.replaceSeller(seller);
    return seller
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(sellerObj: CreateVendedorDto): Vendedor {
    const uuid = uuidv4();
    let sellerWithId = { id: uuid, ...sellerObj }
    return sellerWithId
  }

  replaceSeller(seller: Vendedor): void {
    const index = this.sellers.indexOf( seller );
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.sellers.splice(index, 1, seller)
  }

  unassignCarFromSeller(car: Automovil): Vendedor {
    const sellerFound = this.getSellerById(car.seller[0].id);
    if (!sellerFound) {
      throw new HttpException(
        "No hay ningun vendedor con esta id", 
        HttpStatus.NOT_FOUND)
    };
    sellerFound.sold_cars = sellerFound.sold_cars.filter(soldCars => soldCars.id !== car.id);
    this.replaceSeller(sellerFound);
    return sellerFound;
  }  

  //esta funcion se encarga de crear nuevos vendedores cuando la llamada viene de fuera
  handleNewSeller(car: Automovil): Vendedor {
    let newSeller: Vendedor = {
      name: car.seller[0].name,
      id: uuidv4(),
      sold_cars: [
        {
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          seller: [null]
        }
      ]   
    }
    if(car.client) newSeller.sold_cars[0].client = car.client;
    this.sellers.push(newSeller);
    return newSeller
  }

  validateSeller(name: string): boolean {
    if ( !name || typeof name !== 'string' ) return false;
    if ( name.length > 0 ) return true;
  }

}
