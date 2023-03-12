import { AutomovilService } from './../automovil/services/automovil.service';
import { ClienteModule } from './../cliente/cliente.module';
import { Module } from '@nestjs/common';
import { VendedorController } from './controllers/vendedor.controller';
import { VendedorService } from './services/vendedor.service';

@Module({
  controllers: [VendedorController],
  providers: [VendedorService],
  exports: [VendedorService],
  imports: [ClienteModule, AutomovilService,],
})
export class VendedorModule {}
