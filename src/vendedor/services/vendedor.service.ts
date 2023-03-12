import { SellCarInfo } from './../dto/sell-car.dto';
import { AutomovilService } from './../../automovil/services/automovil.service';
import { ClienteService } from './../../cliente/service/cliente.service';
import { AutomovilInfoBasica } from './../../automovil/interfaces/car-basic-info.interface';
import { Vendedor } from './../entities/vendedor.entity';
import { Injectable } from '@nestjs/common';
import { CreateVendedorDto } from '../dto/create-vendedor.dto';
import { UpdateVendedorDto } from '../dto/update-vendedor.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class VendedorService {

  constructor (
    private clientService: ClienteService,
    private automovilService: AutomovilService,
  ) {}

  sellers: Vendedor[];

  createSeller(createVendedorDto: CreateVendedorDto): Vendedor {
    const newSeller = this.addId(createVendedorDto);

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
  
  addSoldCar(uuid: string, info: SellCarInfo) {
    const car = this.automovilService.getCarById(info.carId);
    const buyer = this.clientService.getClientById(info.clientId);
    const seller = this.getSellerById(uuid);

    const { bought_cars, sold_cars, ...rest } = buyer;
    car.client.push(rest);
    seller.sold_cars.push(car);
    this.replaceSeller(seller)
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(sellerObj: CreateVendedorDto): Vendedor {
    const uuid = uuidv4();
    let sellerWithId = {...sellerObj, id: uuid}
    return sellerWithId
  }

  replaceSeller(seller: Vendedor): void {
    const index = this.sellers.indexOf( seller );
    this.sellers.splice(index, 1, seller)
  }
  
}
