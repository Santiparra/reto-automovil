import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateVendedorSimpleDto } from './create-vendedor-simple.dto';

export class UpdateVendedorSimpleDto extends PartialType(CreateVendedorSimpleDto) {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Georgina Gonzales", description: 'Nombre completo del Vendedor' })
    name: string;
    
}

