import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { CreateAutomovilDto } from './create-automovil.dto';

export class UpdateAutomovilDto extends PartialType(CreateAutomovilDto) {
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
