import { SellCarInfo } from './../dto/sell-car.dto';
import { AutomovilService } from './../../automovil/services/automovil.service';
import { ClienteService } from './../../cliente/service/cliente.service';
import { AutomovilInfoBasica } from './../../automovil/interfaces/car-basic-info.interface';
import { Vendedor } from './../entities/vendedor.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateVendedorDto } from '../dto/create-vendedor.dto';
import { UpdateVendedorDto } from '../dto/update-vendedor.dto';
import { v4 as uuidv4 } from 'uuid';
import { Automovil } from 'src/automovil/entities/automovil.entity';


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
    return this.sellers.find(seller => seller.id === uuid);
  }

  updateSeller(uuid: string, updateVendedorDto: UpdateVendedorDto): Vendedor {
    let changedSeller = this.getSellerById(uuid);
    changedSeller = {...changedSeller, ...updateVendedorDto};
    this.replaceSeller(changedSeller);
    return changedSeller
  }

  deleteSeller(id: string): Vendedor {
    const sellerToDelete = this.getSellerById(id);
    this.sellers = this.sellers.filter(seller => seller.id !== id);
    return sellerToDelete
  }

  /* Se que esto no es la solucion mas elegante;
  no se si es estrictamente necesario pero me parece redundante devolver la informacion 
  del vendedor 2 veces asi que cree un dto aparte pero tambien podria haber hecho un 
  interceptor o poner que la propiedad vendedor fuese opcional en automovil */
  getSoldCarsBySellerId(uuid: string): AutomovilInfoBasica[] {
    const sellerFound = this.getSellerById(uuid);
    let cleanInfo: AutomovilInfoBasica[] = [];
    sellerFound.sold_cars.forEach(sold_car => {
      const { seller, ...rest } = sold_car;
      cleanInfo.push(rest);
    });
    return cleanInfo
  }
     
  addSoldCar(uuid: string, info: SellCarInfo): Vendedor {
    const car = this.automovilService.getCarById(info.carId);    
    const seller = this.getSellerById(uuid);
    car.seller[0].id = uuid;
    car.seller[0].name = seller.name
    this.clientService.setSeller(car);
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
    this.sellers.splice(index, 1, seller)
  }

  unassignCarFromSeller(car: Automovil): Vendedor {
    const sellerFound = this.getSellerById(car.seller[0].id);
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
