import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateClienteSimpleDto } from './create-cliente-simple.dto';

export class UpdateClienteSimpleDto extends PartialType(CreateClienteSimpleDto) {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Georgina Gonzales", description: 'Nombre completo del Cliente' })
    name: string;
    
}
