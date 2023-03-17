import { Module } from '@nestjs/common';
import { AutomovilSimpleController } from './controllers/automovil-simple.controller';
import { AutomovilSimpleService } from './services/automovil-simple.service';

@Module({
  controllers: [AutomovilSimpleController],
  providers: [AutomovilSimpleService]
})
export class AutomovilSimpleModule {}
