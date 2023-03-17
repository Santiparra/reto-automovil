import { VendedorSimpleModule } from './../vendedor-simple/vendedor-simple.module';
import { forwardRef, Module } from '@nestjs/common';
import { AutomovilSimpleController } from './controllers/automovil-simple.controller';
import { AutomovilSimpleService } from './services/automovil-simple.service';
import { ClienteSimpleModule } from '../cliente-simple/cliente-simple.module';

@Module({
  imports: [
    forwardRef(() => ClienteSimpleModule), 
    forwardRef(() =>  VendedorSimpleModule)
  ], 
  exports: [AutomovilSimpleService],
  controllers: [AutomovilSimpleController],
  providers: [AutomovilSimpleService]
})
export class AutomovilSimpleModule {}
