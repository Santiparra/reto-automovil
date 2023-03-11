import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateAutomovilDto } from '../dto/create-automovil.dto';
import { UpdateAutomovilDto } from '../dto/update-automovil.dto';
import { AutomovilService } from '../services/automovil.service';

@Controller('automovil')
export class AutomovilController {
  constructor( private readonly automovilService: AutomovilService ) {}

  @Post()
  create( @Body() createAutomovilDto: CreateAutomovilDto ) {
    return this.automovilService.createCar(createAutomovilDto);
  }

  @Get()
  findAll() {
    return this.automovilService.getAllCars();
  }

  @Get()
  findAllCarsOnSale() {
    return this.automovilService.getCarsOnSale();
  }

  @Get(':uuid')
  findOne( @Param('uuid', ParseUUIDPipe) uuid: string ) {
    return this.automovilService.getCarById(uuid);
  }

  @Patch( ':uuid' )
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

  @Patch(':uuid')
  assign(
    @Param('uuid', ParseUUIDPipe) uuid: string, 
    @Body() updateAutomovilDto: UpdateAutomovilDto
    ) {
    return this.automovilService.assignCarToClient(uuid, updateAutomovilDto);
  }

  @Patch(':uuid')
  unassign(
    @Param('uuid', ParseUUIDPipe) uuid: string, 
    @Body() updateAutomovilDto: UpdateAutomovilDto
    ) {
    return this.automovilService.unassignCarFromClient(uuid, updateAutomovilDto);
  }

}
