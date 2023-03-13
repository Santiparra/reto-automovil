import { PartialType } from '@nestjs/mapped-types';
import { CreateAutomovilMysqlDto } from './create-automovil-mysql.dto';

export class UpdateAutomovilMysqlDto extends PartialType(CreateAutomovilMysqlDto) {}
