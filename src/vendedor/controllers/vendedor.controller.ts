import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
import { CreateVendedorDto } from "../dto/create-vendedor.dto";
import { UpdateVendedorDto } from "../dto/update-vendedor.dto";
import { VendedorService } from "../services/vendedor.service";

@Controller("vendedor")
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

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

  @Get(":uuid")
  soldCars(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.vendedorService.getSoldCarsBySellerId(uuid)
  }

  @Post(":uuid")
  soldCar(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() createVendedorDto: CreateVendedorDto
    ) {
    return this.vendedorService.addSoldCar(uuid, createVendedorDto);
  }

}
