import { AgregarVenta } from '../dto/agregar-venta.dto';
import { CreateVendedorSimpleDto } from '../dto/create-vendedor-simple.dto';
import { UpdateVendedorSimpleDto } from '../dto/update-vendedor-simple.dto';
import { VendedorSimpleService } from '../services/vendedor-simple.service';
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

@Controller('vendedor-simple')
export class VendedorSimpleController {

  constructor(private readonly vendedorSimpleService: VendedorSimpleService) {}

  private readonly logger = new Logger(VendedorSimpleController.name);

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createVendedorSimpleDto: CreateVendedorSimpleDto) {
    return this.vendedorSimpleService.createSeller(createVendedorSimpleDto);
  }

  @Get()
  findAll() {
    return this.vendedorSimpleService.getAllSellers();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorSimpleService.getSellerById(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() updateVendedorDto: UpdateVendedorSimpleDto
    ) {
    return this.vendedorSimpleService.updateSeller(uuid, updateVendedorDto);
  }

  @Delete(":uuid")
  remove(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorSimpleService.deleteSeller(uuid);
  }

  @Get("sold-cars/:uuid")
  soldCars(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorSimpleService.getSoldCarsBySellerId(uuid)
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(":uuid")
  sellCar(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() sellingData: AgregarVenta
    ) {
    return this.vendedorSimpleService.addSoldCar(uuid, sellingData);
  }

}
