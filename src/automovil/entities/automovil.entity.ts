import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Vendedor } from './../../vendedor/entities/vendedor.entity';

export class Automovil {

    id: string;
    brand: string;
    model: string;
    year: number;
    seller: Vendedor[];
    client?: Cliente[]; 

}
