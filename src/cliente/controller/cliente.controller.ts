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
import { SellCarInfo } from './../../vendedor/dto/sell-car.dto';
import { CreateClienteDto } from "../dto/create-cliente.dto";
import { UpdateClienteDto } from "../dto/update-cliente.dto";
import { ClienteService } from '../service/cliente.service';

@Controller("cliente")
export class ClienteController {
  
  private readonly logger = new Logger(ClienteController.name);

  constructor(private readonly clienteService: ClienteService) { }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.createClient(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.getAllClients();
  }

  @Get(":uuid")
  findOne(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.clienteService.getClientById(uuid);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(":uuid")
  update(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() updateClienteDto: UpdateClienteDto
    ) {
    return this.clienteService.updateClient(uuid, updateClienteDto);
  }

  @Delete(":uuid")
  remove(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.clienteService.deleteClient(uuid);
  }

  @Get(":uuid")
  findCar(@Param("uuid", ParseUUIDPipe) uuid: string) {
    return this.clienteService.getClientCar(uuid)
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post("/assign")
  assign(
    @Body() assignInfo: SellCarInfo ) {
    return this.clienteService.assignCarToClient(assignInfo);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(":uuid")
  unassign( 
    @Param("uuid", ParseUUIDPipe) uuid: string,
    ) {
    return this.clienteService.unassignCarToClient(uuid);
  }

}
