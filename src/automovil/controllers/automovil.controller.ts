import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe,
  UsePipes, 
  ValidationPipe, 
  Logger
} from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';
import { AutomovilService } from '../services/automovil.service';
import { SellCarInfo } from './../../vendedor/dto/sell-car.dto';

@Controller('automovil')
export class AutomovilController {
  
  private readonly logger = new Logger(AutomovilController.name);

  constructor( private readonly automovilService: AutomovilService ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create( @Body() createAutomovilDto: CreateAutomovilDto ) {
    return this.automovilService.createCar(createAutomovilDto);
  }

  @Get()
  findAll() {
    this.logger.log("Buscando Automoviles");
    return this.automovilService.getAllCars();
  }

  @Get("/onsale")
  findAllCarsOnSale() {
    return this.automovilService.getCarsOnSale();
  }

  @Get(':uuid')
  findOne( @Param('uuid', ParseUUIDPipe) uuid: string ) {
    return this.automovilService.getCarById(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':uuid')
  update( 
    @Param('uuid', ParseUUIDPipe) uuid: string, 
    @Body() updateAutomovilDto: UpdateAutomovilDto
    ) {
    return this.automovilService.updateCar(uuid, updateAutomovilDto);
  }

  @Delete(':uuid')
  remove( @Param('uuid', ParseUUIDPipe) uuid: string ) {
    return this.automovilService.deleteCar(uuid);
  }

  //Pregunta a matias por el bug que daba aca
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))  
  @Post('assign')
  assign( @Body() assignInfo: SellCarInfo) {
    return this.automovilService.assignCarToClient(assignInfo);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(':uuid')
  unassign(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    ) {
    return this.automovilService.unassignCarFromClient(uuid);
  }

}
