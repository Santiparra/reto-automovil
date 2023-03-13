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

@Module({
  imports: [
    ClienteModule, 
    AutomovilModule, 
    VendedorModule, 
    AutomovilMysqlModule, 
    ClienteMysqlModule, 
    VendedorMysqlModule,
    LoggerModule.forRoot(loggerConfig)
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes("*");
  }
}
