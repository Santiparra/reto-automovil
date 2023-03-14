import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { CreateAutomovilMysqlDto } from './create-automovil-mysql.dto';

export class UpdateAutomovilMysqlDto extends PartialType(CreateAutomovilMysqlDto) {
   
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    model?: string;
   
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    year?: number;
    
}
