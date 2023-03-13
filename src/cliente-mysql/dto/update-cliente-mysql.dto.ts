import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteMysqlDto } from './create-cliente-mysql.dto';

export class UpdateClienteMysqlDto extends PartialType(CreateClienteMysqlDto) {}
