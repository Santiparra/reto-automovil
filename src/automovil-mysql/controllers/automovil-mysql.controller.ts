import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ParseUUIDPipe } from '@nestjs/common';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';
import { AutomovilMysqlService } from '../services/automovil-mysql.service';

@Controller('automovil-mysql')
export class AutomovilMysqlController {

  private readonly logger = new Logger(AutomovilMysqlController.name);
  
  constructor(private readonly automovilMysqlService: AutomovilMysqlService) {}

  @Post()
  create(@Body() createAutomovilMysqlDto: CreateAutomovilMysqlDto) {
    return this.automovilMysqlService.createCar(createAutomovilMysqlDto);
  }

  @Get()
  findAll() {
    return this.automovilMysqlService.getAllCars();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.automovilMysqlService.getCarById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAutomovilMysqlDto: UpdateAutomovilMysqlDto) {
    return this.automovilMysqlService.updateCar(id, updateAutomovilMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.automovilMysqlService.deleteCar(id);
  }

  @Post('assign')
  assign( @Body() assignInfo: SellCarInfo) {
    return this.automovilMysqlService.assignCarToClient(assignInfo);
  }

  @Post(':id')
  unassign(
    @Param('id', ParseUUIDPipe) id: string,
    ) {
    return this.automovilMysqlService.unassignCarFromClient(id);
  }
}
