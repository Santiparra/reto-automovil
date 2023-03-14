import { Automovil } from '../../automovil/interfaces/automovil.interface';

export interface Cliente {

    id: string;
    name: string;
    bought_cars?: Automovil[];
    sold_cars?: Automovil[];
}
