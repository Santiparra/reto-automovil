import { Vendedor } from './../../vendedor/entities/vendedor.entity';
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Cliente } from 'src/cliente/entities/cliente.entity';

export class CreateAutomovilDto {
     
    @IsString()
    @IsNotEmpty()
    brand: string;
    
    @IsString()
    @IsNotEmpty()
    model: string;
   
    @IsInt()
    @IsNotEmpty()
    year: number;
   
    seller: Vendedor[];
   
    client?: Cliente[];

}
