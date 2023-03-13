import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { CreateAutomovilMysqlDto } from '../dto/create-automovil-mysql.dto';
import { UpdateAutomovilMysqlDto } from '../dto/update-automovil-mysql.dto';
import { AutomovilMysqlService } from '../services/automovil-mysql.service';

@Controller('automovil-mysql')
export class AutomovilMysqlController {

  private readonly logger = new Logger(AutomovilMysqlController.name);
  
  constructor(private readonly automovilMysqlService: AutomovilMysqlService) {}

  @Post()
  create(@Body() createAutomovilMysqlDto: CreateAutomovilMysqlDto) {
    return this.automovilMysqlService.create(createAutomovilMysqlDto);
  }

  @Get()
  findAll() {
    return this.automovilMysqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.automovilMysqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutomovilMysqlDto: UpdateAutomovilMysqlDto) {
    return this.automovilMysqlService.update(+id, updateAutomovilMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.automovilMysqlService.remove(+id);
  }
}
