import { Vendedor } from './../../vendedor/entities/vendedor.entity';
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { uuid } from "uuidv4";
import { Cliente } from 'src/cliente/entities/cliente.entity';

export class CreateAutomovilDto {
    
    @IsUUID()
    @IsNotEmpty()
    id = uuid();
   
    @IsString()
    @IsNotEmpty()
    brand: string;
    
    @IsString()
    @IsNotEmpty()
    model: string;
   
    @IsInt()
    @IsNotEmpty()
    year: number;
   
    vendedor: Vendedor[];
   
    client?: Cliente[];

}
