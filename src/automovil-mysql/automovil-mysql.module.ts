import { Module } from '@nestjs/common';
import { AutomovilMysqlController } from './controllers/automovil-mysql.controller';
import { AutomovilMysqlService } from './services/automovil-mysql.service';

@Module({
  controllers: [AutomovilMysqlController],
  providers: [AutomovilMysqlService]
})
export class AutomovilMysqlModule {}
