import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { CreateClienteMysqlDto } from '../dto/create-cliente-mysql.dto';
import { UpdateClienteMysqlDto } from '../dto/update-cliente-mysql.dto';
import { ClienteMysqlService } from '../services/cliente-mysql.service';

@Controller('cliente-mysql')
export class ClienteMysqlController {

  private readonly logger = new Logger(ClienteMysqlController.name);

  constructor(private readonly clienteMysqlService: ClienteMysqlService) {}

  @Post()
  create(@Body() createClienteMysqlDto: CreateClienteMysqlDto) {
    return this.clienteMysqlService.create(createClienteMysqlDto);
  }

  @Get()
  findAll() {
    return this.clienteMysqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteMysqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteMysqlDto: UpdateClienteMysqlDto) {
    return this.clienteMysqlService.update(+id, updateClienteMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteMysqlService.remove(+id);
  }
}
