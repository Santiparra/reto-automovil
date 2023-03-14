import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMysql } from 'src/entities/car.entity';
import { AutomovilMysqlController } from './controllers/automovil-mysql.controller';
import { AutomovilMysqlService } from './services/automovil-mysql.service';

@Module({
  imports: [TypeOrmModule.forFeature([ CarMysql ])],
  controllers: [AutomovilMysqlController],
  providers: [AutomovilMysqlService]
})
export class AutomovilMysqlModule {}
