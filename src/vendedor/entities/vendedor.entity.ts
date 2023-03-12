import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Automovil } from './../../automovil/entities/automovil.entity';

export class Vendedor {
    /* @IsUUID()
    @IsNotEmpty() */
    id: string;

    /* @IsString()
    @IsNotEmpty() */
    name: string;    
    
    /* @IsArray()
    @IsNotEmpty() */
    sold_cars?: Automovil[];
}
