import { AddSaleDto } from './../dto/add-sale.dto';
import { CreateVendedorMysqlDto } from '../dto/create-vendedor-mysql.dto';
import { VendedorMysqlService } from '../services/vendedor-mysql.service';
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

@Controller('vendedor-mysql')
export class VendedorMysqlController {

  private readonly logger = new Logger(VendedorMysqlController.name);

  constructor(private readonly vendedorMysqlService: VendedorMysqlService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
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

  @UsePipes(new ValidationPipe({ whitelist: true }))
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

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post("sale/:id")
  sellCar(
    @Param("id", ParseUUIDPipe) id: string, 
    @Body() sellingData: AddSaleDto
    ) {
    return this.vendedorMysqlService.addSoldCar(id, sellingData);
  }

}
