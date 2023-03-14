import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerMysql } from 'src/entities/seller.entity';
import { VendedorMysqlController } from './controllers/vendedor-mysql.controller';
import { VendedorMysqlService } from './services/vendedor-mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([ SellerMysql ])],
  controllers: [VendedorMysqlController],
  providers: [VendedorMysqlService]
})
export class VendedorMysqlModule {}
