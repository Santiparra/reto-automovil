import { SellCarInfo } from 'src/App-Local-Version-Buena/vendedor/dto/sell-car.dto';
import { CreateClienteSimpleDto } from '../dto/create-cliente-simple.dto';
import { UpdateClienteSimpleDto } from '../dto/update-cliente-simple.dto';
import { ClienteSimpleService } from '../services/cliente-simple.service';
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

@Controller('cliente-simple')
export class ClienteSimpleController {

  constructor(private readonly clienteSimpleService: ClienteSimpleService) {}

  private readonly logger = new Logger(ClienteSimpleController.name);

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createClienteSimpleDto: CreateClienteSimpleDto) {
    return this.clienteSimpleService.createClient(createClienteSimpleDto);
  }

  @Get()
  findAll() {
    return this.clienteSimpleService.getAllClients();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.clienteSimpleService.getClientById(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() updateClienteDto: UpdateClienteSimpleDto
    ) {
    return this.clienteSimpleService.updateClient(uuid, updateClienteDto);
  }

  @Delete(":uuid")
  remove(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.clienteSimpleService.deleteClient(uuid);
  }

  @Get(":uuid")
  findCar(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.clienteSimpleService.getClientCar(uuid)
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post("/assign")
  assign(
    @Body() assignInfo: SellCarInfo ) {
    return this.clienteSimpleService.assignCarToClient(assignInfo);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(":uuid")
  unassign( 
    @Param("uuid", ParseUUIDPipe) uuid: string,
    ) {
    return this.clienteSimpleService.unassignCarToClient(uuid);
  }

}
