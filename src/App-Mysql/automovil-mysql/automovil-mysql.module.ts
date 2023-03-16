import { VendedorMysqlModule } from './../vendedor-mysql/vendedor-mysql.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteMysqlModule } from '../cliente-mysql/cliente-mysql.module';
import { CarMysql } from '../entities/car.entity';
import { AutomovilMysqlController } from './controllers/automovil-mysql.controller';
import { AutomovilMysqlService } from './services/automovil-mysql.service';

@Module({
  imports: [
    VendedorMysqlModule,
    ClienteMysqlModule,
    TypeOrmModule.forFeature([ CarMysql ])],
  exports: [AutomovilMysqlService],  
  controllers: [AutomovilMysqlController],
  providers: [AutomovilMysqlService]
})
export class AutomovilMysqlModule {}
