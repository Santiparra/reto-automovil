import { Automovil } from '../../automovil/interfaces/automovil.interface';

/* agregue el array de autos vendidos como opcional dado que un vendedor 
y cliente ambos tienen capacidad de compra-venta */

export interface Cliente {

    id: string;
    name: string;
    bought_cars?: Automovil[];
    sold_cars?: Automovil[];
}
