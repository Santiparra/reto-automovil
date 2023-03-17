import { AssignarAuto } from '../dto/asignar-auto.dto';
import { CreateAutomovilSimpleDto } from '../dto/create-automovil-simple.dto';
import { UpdateAutomovilSimpleDto } from '../dto/update-automovil-simple.dto';
import { AutomovilSimpleService } from '../services/automovil-simple.service';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Logger, 
  ParseUUIDPipe, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';

@Controller('automovil-simple')
export class AutomovilSimpleController {

  constructor(private readonly automovilSimpleService: AutomovilSimpleService) {}

  private readonly logger = new Logger(AutomovilSimpleController.name);

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create( @Body() createAutomovilSimpleDto: CreateAutomovilSimpleDto ) {
    return this.automovilSimpleService.createCar(createAutomovilSimpleDto);
  }

  @Get()
  findAll() {
    this.logger.log("Buscando Automoviles");
    return this.automovilSimpleService.getAllCars();
  }

  @Get("/onsale")
  findAllCarsOnSale() {
    return this.automovilSimpleService.getCarsOnSale();
  }

  @Get(':uuid')
  findOne( @Param('uuid', ParseUUIDPipe) uuid: string ) {
    return this.automovilSimpleService.getCarById(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':uuid')
  update( 
    @Param('uuid', ParseUUIDPipe) uuid: string, 
    @Body() updateAutomovilDto: UpdateAutomovilSimpleDto
    ) {
    return this.automovilSimpleService.updateCar(uuid, updateAutomovilDto);
  }

  @Delete(':uuid')
  remove( @Param('uuid', ParseUUIDPipe) uuid: string ) {
    return this.automovilSimpleService.deleteCar(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))  
  @Post('assign/:uuid')
  assign( 
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() assignInfo: AssignarAuto) {
    return this.automovilSimpleService.assignCarToClient(uuid, assignInfo);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('unassign/:uuid')
  unassign(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    ) {
    return this.automovilSimpleService.unassignCarFromClient(uuid);
  }

}
