import { Module } from '@nestjs/common';
import { VendedorController } from './controllers/vendedor.controller';
import { VendedorService } from './services/vendedor.service';

@Module({
  controllers: [VendedorController],
  providers: [VendedorService],
})
export class VendedorModule {}
