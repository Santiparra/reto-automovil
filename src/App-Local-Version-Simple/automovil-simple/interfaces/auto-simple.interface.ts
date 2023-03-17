import { ClienteSimple } from './../../cliente-simple/interfaces/cliente-simple.interface';
import { VendedorSimple } from './../../vendedor-simple/interfaces/vendedor-simple.interface';

export interface AutoSimple {

    id: string;
    brand: string;
    model: string;
    year: number;
    seller: VendedorSimple[];
    client?: ClienteSimple[]; 

}
