import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class UpdateAutomovilSimpleDto {
    
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
