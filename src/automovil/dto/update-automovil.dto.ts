import { PartialType } from '@nestjs/mapped-types';
import { CreateAutomovilDto } from './create-automovil.dto';

export class UpdateAutomovilDto extends PartialType(CreateAutomovilDto) {}
