import { AutomovilModule } from './../automovil/automovil.module';
import { ClienteModule } from './../cliente/cliente.module';
import { forwardRef, Module } from '@nestjs/common';
import { VendedorController } from './controllers/vendedor.controller';
import { VendedorService } from './services/vendedor.service';

@Module({
  imports: [
    forwardRef(() => ClienteModule), 
    forwardRef(() => AutomovilModule)
  ],
  controllers: [VendedorController],
  providers: [VendedorService],
  exports: [VendedorService],  
})
export class VendedorModule {}
