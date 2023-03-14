import { Automovil } from '../../automovil/interfaces/automovil.interface';

export interface Vendedor {
    
    id: string;
    name: string;    
    
    sold_cars?: Automovil[];
}
