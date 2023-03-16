import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomovilMysqlModule } from '../automovil-mysql/automovil-mysql.module';
import { SellerMysql } from '../entities/seller.entity';
import { VendedorMysqlController } from './controllers/vendedor-mysql.controller';
import { VendedorMysqlService } from './services/vendedor-mysql.service';

@Module({
  imports: [
    forwardRef(() => AutomovilMysqlModule),
    TypeOrmModule.forFeature([ SellerMysql ])],
  controllers: [VendedorMysqlController],
  providers: [VendedorMysqlService],
})
export class VendedorMysqlModule {}
