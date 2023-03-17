import { Vendedor } from '../../vendedor/interfaces/vendedor.interface';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Cliente } from 'src/App-Local-Version-Buena/cliente/interfaces/cliente.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAutomovilDto {
     
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Toyota", description: 'Marca del auto' })
    brand: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Corolla", description: 'Modelo del auto' })
    model: string;
   
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ example: 1997, description: 'Año en que se fabrico el auto' })
    year: number;
   
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [
        {
        "id": "39f2ed1e-0828-4ec6-8ec4-a622a4f06761",
        "name": "Pepe Lepew"
        }    
    ], 
    description: `Un Array conteniendo un Objeto donde la id sea igual a la uuid de un Vendedor, 
    si no existe se crea a partir del nombre brindado` })
    seller: Vendedor[];
   
    @IsArray()
    @IsOptional()
    @ApiProperty({ example: [
        {
        "id": "39f2ed1e-0828-4ec6-8ec4-a622a4f06761",
        "name": "Valeria Lopez"
        }    
    ], 
    description: `Un Array conteniendo un Objeto donde la id sea igual a la uuid de un Cliente, 
    si no existe se crea a partir del nombre brindado` })
    client?: Cliente[];

}
