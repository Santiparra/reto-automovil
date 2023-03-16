import { forwardRef, Module } from '@nestjs/common';
import { ClienteMysqlController } from './controllers/cliente-mysql.controller';
import { ClienteMysqlService } from './services/cliente-mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientMysql } from '../entities/client.entity';
import { AutomovilMysqlModule } from '../automovil-mysql/automovil-mysql.module';

@Module({
  imports: [
    forwardRef(() => AutomovilMysqlModule),
    TypeOrmModule.forFeature([ ClientMysql ]),
  ],
  exports: [ClienteMysqlService],
  controllers: [ClienteMysqlController],
  providers: [ClienteMysqlService]
})
export class ClienteMysqlModule {}
