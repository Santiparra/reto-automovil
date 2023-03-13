import { Cliente } from 'src/cliente/interfaces/cliente.interface';
import { Vendedor } from 'src/vendedor/interfaces/vendedor.interface';

export interface Automovil {

    id: string;
    brand: string;
    model: string;
    year: number;
    seller: Vendedor[];
    client?: Cliente[]; 

}
