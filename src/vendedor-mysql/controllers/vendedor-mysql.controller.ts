import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ParseUUIDPipe } from '@nestjs/common';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';
import { VendedorMysqlService } from '../services/vendedor-mysql.service';

@Controller('vendedor-mysql')
export class VendedorMysqlController {

  private readonly logger = new Logger(VendedorMysqlController.name);

  constructor(private readonly vendedorMysqlService: VendedorMysqlService) {}

  @Post()
  create(@Body() createVendedorMysqlDto: CreateVendedorMysqlDto) {
    return this.vendedorMysqlService.createVendedor(createVendedorMysqlDto);
  }

  @Get()
  findAll() {
    return this.vendedorMysqlService.getAllSellers();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.vendedorMysqlService.getSellerById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateVendedorMysqlDto: CreateVendedorMysqlDto 
    ) {
    return this.vendedorMysqlService.updateSeller(id, updateVendedorMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vendedorMysqlService.deleteSeller(id);
  }

  @Get("sold-cars/:id")
  soldCars(@Param("id", ParseUUIDPipe) id: string) {
    return this.vendedorMysqlService.getSoldCarsBySellerId(id)
  }

  @Post(":id")
  sellCar(
    @Param("id", ParseUUIDPipe) id: string, 
    @Body() sellingData: SellCarInfo
    ) {
    return this.vendedorMysqlService.addSoldCar(id, sellingData);
  }

}
