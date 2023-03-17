import { Module } from '@nestjs/common';
import { VendedorSimpleController } from './controllers/vendedor-simple.controller';
import { VendedorSimpleService } from './services/vendedor-simple.service';

@Module({
  controllers: [VendedorSimpleController],
  providers: [VendedorSimpleService]
})
export class VendedorSimpleModule {}
