import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Automovil } from './../../automovil/entities/automovil.entity';

export class Vendedor {
    
    id: string;
    name: string;    
    
    sold_cars: Automovil[];
}
