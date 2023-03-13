import { Module } from '@nestjs/common';
import { ClienteMysqlController } from './controllers/cliente-mysql.controller';
import { ClienteMysqlService } from './services/cliente-mysql.service';

@Module({
  controllers: [ClienteMysqlController],
  providers: [ClienteMysqlService]
})
export class ClienteMysqlModule {}
