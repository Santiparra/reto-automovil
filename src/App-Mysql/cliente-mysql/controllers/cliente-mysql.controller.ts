import { AssignClientToCar } from './../dto/assign-client.dto';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { ClienteMysqlService } from '../services/cliente-mysql.service';
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
  Put, 
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

@Controller('cliente-mysql')
export class ClienteMysqlController {

  private readonly logger = new Logger(ClienteMysqlController.name);

  constructor(private readonly clienteMysqlService: ClienteMysqlService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
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

  @UsePipes(new ValidationPipe({ whitelist: true }))
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

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put("assign/:id")
  assign(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignInfo: AssignClientToCar 
    ) {
    return this.clienteMysqlService.assignCarToClient(id, assignInfo);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put("unassign/:id")
  unassign( @Param("id", ParseUUIDPipe) id: string,
    @Body() unassignInfo: AssignClientToCar 
   ) {
    return this.clienteMysqlService.unassignCarToClient(id, unassignInfo);
  }

}
