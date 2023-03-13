import { Module } from '@nestjs/common';
import { VendedorMysqlController } from './controllers/vendedor-mysql.controller';
import { VendedorMysqlService } from './services/vendedor-mysql.service';

@Module({
  controllers: [VendedorMysqlController],
  providers: [VendedorMysqlService]
})
export class VendedorMysqlModule {}
