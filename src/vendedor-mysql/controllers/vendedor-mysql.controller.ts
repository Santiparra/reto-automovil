import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';
import { UpdateVendedorMysqlDto } from '../dto/update-vendedor-mysql.dto';
import { VendedorMysqlService } from '../services/vendedor-mysql.service';

@Controller('vendedor-mysql')
export class VendedorMysqlController {

  private readonly logger = new Logger(VendedorMysqlController.name);

  constructor(private readonly vendedorMysqlService: VendedorMysqlService) {}

  @Post()
  create(@Body() createVendedorMysqlDto: CreateVendedorMysqlDto) {
    this.logger.log("Creando Automovil");
    return this.vendedorMysqlService.create(createVendedorMysqlDto);
  }

  @Get()
  findAll() {
    this.logger.log("Buscando Automoviles");
    return this.vendedorMysqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendedorMysqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendedorMysqlDto: UpdateVendedorMysqlDto) {
    return this.vendedorMysqlService.update(+id, updateVendedorMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendedorMysqlService.remove(+id);
  }
}
