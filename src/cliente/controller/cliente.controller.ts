import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
import { CreateClienteDto } from "../dto/create-cliente.dto";
import { UpdateClienteDto } from "../dto/update-cliente.dto";
import { ClienteService } from "../service";


@Controller("cliente")
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

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

  @Patch(":uuid")
  assign(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() updateClienteDto: UpdateClienteDto
    ) {
    return this.clienteService.assignCarToClient(uuid, updateClienteDto);
  }

  @Patch(":uuid")
  unassign(
    @Param("uuid", ParseUUIDPipe) uuid: string, 
    @Body() updateClienteDto: UpdateClienteDto
    ) {
    return this.clienteService.unassignCarToClient(uuid, updateClienteDto);
  }

}
