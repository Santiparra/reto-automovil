import { Injectable, Logger, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CreateAutomovilSimpleDto } from '../dto/create-automovil-simple.dto';
import { UpdateAutomovilSimpleDto } from '../dto/update-automovil-simple.dto';
import { AutoSimple } from '../interfaces/auto-simple.interface';
import { ClienteSimpleService } from 'src/App-Local-Version-Simple/cliente-simple/services/cliente-simple.service';
import { VendedorSimpleService } from 'src/App-Local-Version-Simple/vendedor-simple/services/vendedor-simple.service';

@Injectable()
export class AutomovilSimpleService {
  
  constructor(
    private clienteService: ClienteSimpleService,
    private vendedorService: VendedorSimpleService
  ) {}

  private readonly logger = new Logger(AutomovilSimpleService.name);

  autos: AutoSimple[] = [];

  createCar(createAutomovilSimpleDto: CreateAutomovilSimpleDto): AutoSimple {
    let newCar: AutoSimple;
    const vendedor = this.vendedorService.getSellerById(createAutomovilSimpleDto.seller);
    if (!vendedor) throw new HttpException("no hay vendedor con esta id", HttpStatus.BAD_REQUEST);
    const autoConId = this.addId(createAutomovilSimpleDto);  
    if (createAutomovilSimpleDto.client) {
      const cliente = this.clienteService.getClientById(createAutomovilSimpleDto.client);
      if (!cliente) throw new HttpException("no hay cliente con esta id", HttpStatus.BAD_REQUEST);
      newCar = { ...autoConId, seller: [vendedor], client: [cliente] };  
    };      
    newCar = { ...autoConId, seller: [vendedor], client: [null]};    
    this.autos.push(newCar);
    return newCar
  }

  getAllCars(): AutoSimple[] {
    return this.autos;
  }

  getCarsOnSale(): AutoSimple[] {
    const autoALaVenta = this.autos.filter(esto => esto.client === null || !esto.client);
    return autoALaVenta
  }
  
  getCarById(uuid: string): AutoSimple {
    const auto = this.autos.find(esto => esto.id === uuid);
    return auto
  }

  updateCar(uuid: string, updateAutomovilDto: UpdateAutomovilSimpleDto): AutoSimple {
    let autoFound = this.getCarById(uuid);
    if ( !autoFound ) throw new NotFoundException("Este automovil no se encuentra en la base de datos");
    autoFound = {...autoFound, ...updateAutomovilDto};
    this.replaceCar(autoFound);    
    return autoFound
  }

  deleteCar(uuid: string): AutoSimple {
    const autoFound = this.getCarById(uuid);
    if (!autoFound) throw new HttpException("Este auto no se encuentra en la base de datos", HttpStatus.NOT_FOUND);
    this.autos = this.autos.filter(esto => esto.id !== uuid);
    return autoFound;
  }

  assignCarToClient(assignInfo: SellCarInfo): AutoSimple {
    throw new Error('Method not implemented.');
  }

  unassignCarFromClient(uuid: string): AutoSimple {
    throw new Error('Method not implemented.');
  }

  //esta funcion podria ser generica pero prefiero especificar la entidad retorno
  addId(carObj: CreateAutomovilSimpleDto) {
    const uuid = uuidv4();
    let carWithId = { id: uuid, ...carObj }
    return carWithId
  }

  //helper function para mantener el codigo dry
  replaceCar(car: AutoSimple): void {
    const index = this.autos.indexOf(car);
    if ( index === -1 ) throw new Error ("Hubo un error en nuestra base de datos");
    this.autos.splice(index, 1, car);
  }
  
}
