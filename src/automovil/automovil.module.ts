import { VendedorModule } from './../vendedor/vendedor.module';
import { Module } from '@nestjs/common';
import { AutomovilController } from './controllers/automovil.controller';
import { AutomovilService } from './services/automovil.service';

@Module({
  imports: [VendedorModule],
  controllers: [AutomovilController],
  providers: [AutomovilService],
  exports: [AutomovilService],
})
export class AutomovilModule {}
