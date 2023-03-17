import { forwardRef, Module } from '@nestjs/common';
import { AutomovilSimpleModule } from '../automovil-simple/automovil-simple.module';
import { ClienteSimpleController } from './controllers/cliente-simple.controller';
import { ClienteSimpleService } from './services/cliente-simple.service';

@Module({
  imports: [ forwardRef(() => AutomovilSimpleModule) ],
  exports: [ClienteSimpleService],
  controllers: [ClienteSimpleController],
  providers: [ClienteSimpleService]
})
export class ClienteSimpleModule {}
