import { Automovil } from './../../automovil/entities/automovil.entity';

export class Cliente {

    id: string;
    name: string;
    bought_cars?: Automovil[];
    
}
