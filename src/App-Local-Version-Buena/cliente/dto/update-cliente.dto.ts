import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Sebastian Abreu", description: 'Nombre completo del Cliente' })
    name: string;
}
