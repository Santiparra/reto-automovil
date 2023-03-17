import { forwardRef, Module } from '@nestjs/common';
import { AutomovilSimpleModule } from '../automovil-simple/automovil-simple.module';
import { VendedorSimpleController } from './controllers/vendedor-simple.controller';
import { VendedorSimpleService } from './services/vendedor-simple.service';

@Module({
  imports: [ forwardRef(() => AutomovilSimpleModule) ],
  exports: [VendedorSimpleService],
  controllers: [VendedorSimpleController],
  providers: [VendedorSimpleService]
})
export class VendedorSimpleModule {}
