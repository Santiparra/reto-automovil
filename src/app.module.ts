import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AutomovilModule } from './App-Local-Version-Buena/automovil/automovil.module';
import { AutomovilMysqlModule } from './App-Mysql/automovil-mysql/automovil-mysql.module';
import { LoggerModule } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendedorModule } from './App-Local-Version-Buena/vendedor/vendedor.module';
import { ClienteMysqlModule } from './App-Mysql/cliente-mysql/cliente-mysql.module';
import { VendedorMysqlModule } from './App-Mysql/vendedor-mysql/vendedor-mysql.module';
import { ClienteModule } from './App-Local-Version-Buena/cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './utils/typeorm.config';
import { loggerConfig } from './utils/logger.config';
import { AutomovilSimpleModule } from './App-Local-Version-Simple/automovil-simple/automovil-simple.module';
import { ClienteSimpleModule } from './App-Local-Version-Simple/cliente-simple/cliente-simple.module';
import { VendedorSimpleModule } from './App-Local-Version-Simple/vendedor-simple/vendedor-simple.module';


@Module({
  imports: [
    ClienteModule, 
    AutomovilModule, 
    VendedorModule, 
    AutomovilMysqlModule, 
    ClienteMysqlModule, 
    VendedorMysqlModule,
    AutomovilSimpleModule,
    ClienteSimpleModule,
    VendedorSimpleModule, 
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),       
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*");
  }
}
