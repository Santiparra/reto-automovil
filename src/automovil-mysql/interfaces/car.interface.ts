import { Client } from 'src/cliente-mysql/interfaces/client.interface';
import { Seller } from 'src/vendedor-mysql/interfaces/seller.interface';

export interface Car {

    id: string;
    brand: string;
    model: string;
    year: number;
    seller?: Seller;
    client?: Client; 

}
