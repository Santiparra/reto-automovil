import { VendedorModule } from './../vendedor/vendedor.module';
import { forwardRef, Module } from '@nestjs/common';
import { AutomovilController } from './controllers/automovil.controller';
import { AutomovilService } from './services/automovil.service';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    forwardRef(() => ClienteModule), 
    forwardRef(() => VendedorModule)
  ],
  controllers: [AutomovilController],
  providers: [AutomovilService],
  exports: [AutomovilService],
})
export class AutomovilModule {}
