import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { AutomovilModule } from './automovil/automovil.module';
import { VendedorModule } from './vendedor/vendedor.module';
import { AutomovilMysqlModule } from './automovil-mysql/automovil-mysql.module';
import { ClienteMysqlModule } from './cliente-mysql/cliente-mysql.module';
import { VendedorMysqlModule } from './vendedor-mysql/vendedor-mysql.module';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './utils/logger-conf';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerMysql } from './entities/seller.entity';
import { ClientMysql } from './entities/client.entity';
import { CarMysql } from './entities/car.entity';

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
    //porfa move esto a scope modulo correspondiente
    TypeOrmModule.forFeature([SellerMysql, CarMysql, ClientMysql])
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*");
  }
}
