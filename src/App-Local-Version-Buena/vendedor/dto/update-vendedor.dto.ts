import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateVendedorDto } from './create-vendedor.dto';

export class UpdateVendedorDto extends PartialType(CreateVendedorDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Pablo Marmol", description: 'Nombre completo del Vendedor' })
    name: string;
}
