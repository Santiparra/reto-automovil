import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, ParseUUIDPipe } from '@nestjs/common';
import { SellCarInfo } from 'src/vendedor/dto/sell-car.dto';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { ClienteMysqlService } from '../services/cliente-mysql.service';

@Controller('cliente-mysql')
export class ClienteMysqlController {

  private readonly logger = new Logger(ClienteMysqlController.name);

  constructor(private readonly clienteMysqlService: ClienteMysqlService) {}

  @Post()
  create(@Body() createClienteMysqlDto: CreateClienteMysqlDto) {
    return this.clienteMysqlService.createClient(createClienteMysqlDto);
  }

  @Get()
  findAll() {
    return this.clienteMysqlService.getAllClients();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clienteMysqlService.getClientById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateClienteMysqlDto: CreateClienteMysqlDto
    ) {
    return this.clienteMysqlService.updateClient(id, updateClienteMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clienteMysqlService.deleteClient(id);
  }

  @Post("/assign")
  assign(
    @Body() assignInfo: SellCarInfo ) {
    return this.clienteMysqlService.assignCarToClient(assignInfo);
  }

  @Post(":id")
  unassign( 
    @Param("id", ParseUUIDPipe) id: string,
    ) {
    return this.clienteMysqlService.unassignCarToClient(id);
  }

}
