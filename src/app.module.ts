import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AutomovilModule } from './App-Local-Version-Buena/automovil/automovil.module';
import { AutomovilMysqlModule } from './App-Mysql/automovil-mysql/automovil-mysql.module';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './utils/logger-conf';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendedorModule } from './App-Local-Version-Buena/vendedor/vendedor.module';
import { ClienteMysqlModule } from './App-Mysql/cliente-mysql/cliente-mysql.module';
import { CarMysql } from './App-Mysql/entities/car.entity';
import { ClientMysql } from './App-Mysql/entities/client.entity';
import { SellerMysql } from './App-Mysql/entities/seller.entity';
import { VendedorMysqlModule } from './App-Mysql/vendedor-mysql/vendedor-mysql.module';
import { ClienteModule } from './App-Local-Version-Buena/cliente/cliente.module';

@Module({
  imports: [
    ClienteModule, 
    AutomovilModule, 
    VendedorModule, 
    AutomovilMysqlModule, 
    ClienteMysqlModule, 
    VendedorMysqlModule,
    LoggerModule.forRoot(loggerConfig),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "santi",
      password: "password11",
      database: "nestjs_automobiliaria",
      entities: [SellerMysql, ClientMysql, CarMysql],
      synchronize: true,
    }),     
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*");
  }
}
