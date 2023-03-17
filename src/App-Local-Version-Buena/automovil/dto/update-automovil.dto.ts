import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { CreateAutomovilDto } from './create-automovil.dto';

export class UpdateAutomovilDto extends PartialType(CreateAutomovilDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: "Toyota", description: 'Marca del auto' })
    brand?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: "Corolla", description: 'Modelo del auto' })
    model?: string;
   
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 1997, description: 'Año en que se fabrico el auto' })
    year?: number;

}
