import { AssignCarToClient } from '../dto/assign-car.dto';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';
import { AutomovilMysqlService } from '../services/automovil-mysql.service';
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
  Put, 
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

@Controller('automovil-mysql')
export class AutomovilMysqlController {

  private readonly logger = new Logger(AutomovilMysqlController.name);
  
  constructor(private readonly automovilMysqlService: AutomovilMysqlService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
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

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateAutomovilMysqlDto: UpdateAutomovilMysqlDto
    ) {
    return this.automovilMysqlService.updateCar(id, updateAutomovilMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.automovilMysqlService.deleteCar(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put('assign/:id')
  assign( 
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignInfo: AssignCarToClient
    ) {
    return this.automovilMysqlService.assignCarToClient(id, assignInfo);
  }

  @Put('unassign/:id')
  unassign(@Param('id', ParseUUIDPipe) id: string) {
    return this.automovilMysqlService.unassignCarFromClient(id);
  }
  
}
