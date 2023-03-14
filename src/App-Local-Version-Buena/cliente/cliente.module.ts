import { VendedorModule } from './../vendedor/vendedor.module';
import { AutomovilModule } from './../automovil/automovil.module';
import { forwardRef, Module } from '@nestjs/common';
import { ClienteController } from './controller/cliente.controller';
import { ClienteService } from './service/cliente.service';

@Module({
  imports: [
    forwardRef(() => AutomovilModule), 
    forwardRef(() => VendedorModule)
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],  
})
export class ClienteModule {}
