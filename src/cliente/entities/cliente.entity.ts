import { Automovil } from './../../automovil/entities/automovil.entity';

/* agregue el array de autos vendidos como opcional dado que un vendedor 
y cliente ambos tienen capacidad de compra-venta */

export class Cliente {

    id: string;
    name: string;
    bought_cars?: Automovil[];
    sold_cars?: Automovil[];
}
