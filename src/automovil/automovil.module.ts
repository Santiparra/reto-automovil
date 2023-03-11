import { Module } from '@nestjs/common';
import { AutomovilController } from './controllers/automovil.controller';
import { AutomovilService } from './services/automovil.service';

@Module({
  controllers: [AutomovilController],
  providers: [AutomovilService],
})
export class AutomovilModule {}
