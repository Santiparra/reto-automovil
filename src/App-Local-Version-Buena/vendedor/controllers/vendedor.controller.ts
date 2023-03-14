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
} from "@nestjs/common";
import { CreateVendedorDto } from "../dto/create-vendedor.dto";
import { SellCarInfo } from "../dto/sell-car.dto";
import { UpdateVendedorDto } from "../dto/update-vendedor.dto";
import { VendedorService } from "../services/vendedor.service";

@Controller("vendedor")
export class VendedorController {
  
  private readonly logger = new Logger(VendedorController.name);

  constructor(private readonly vendedorService: VendedorService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createVendedorDto: CreateVendedorDto) {
    return this.vendedorService.createSeller(createVendedorDto);
  }

  @Get()
  findAll() {
    return this.vendedorService.getAllSellers();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorService.getSellerById(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() updateVendedorDto: UpdateVendedorDto
    ) {
    return this.vendedorService.updateSeller(uuid, updateVendedorDto);
  }

  @Delete(":uuid")
  remove(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorService.deleteSeller(uuid);
  }

  @Get("sold-cars/:uuid")
  soldCars(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorService.getSoldCarsBySellerId(uuid)
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(":uuid")
  sellCar(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() sellingData: SellCarInfo
    ) {
    return this.vendedorService.addSoldCar(uuid, sellingData);
  }

}
