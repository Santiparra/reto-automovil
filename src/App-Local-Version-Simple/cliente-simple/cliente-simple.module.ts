import { Module } from '@nestjs/common';
import { ClienteSimpleController } from './controllers/cliente-simple.controller';
import { ClienteSimpleService } from './services/cliente-simple.service';

@Module({
  controllers: [ClienteSimpleController],
  providers: [ClienteSimpleService]
})
export class ClienteSimpleModule {}
