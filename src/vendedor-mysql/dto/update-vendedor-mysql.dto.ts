import { PartialType } from '@nestjs/mapped-types';
import { CreateVendedorMysqlDto } from './create-vendedor-mysql.dto';

export class UpdateVendedorMysqlDto extends PartialType(CreateVendedorMysqlDto) {}
