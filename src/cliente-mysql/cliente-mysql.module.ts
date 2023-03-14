import { Module } from '@nestjs/common';
import { ClienteMysqlController } from './controllers/cliente-mysql.controller';
import { ClienteMysqlService } from './services/cliente-mysql.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientMysql } from 'src/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ ClientMysql ])],
  controllers: [ClienteMysqlController],
  providers: [ClienteMysqlService]
})
export class ClienteMysqlModule {}
