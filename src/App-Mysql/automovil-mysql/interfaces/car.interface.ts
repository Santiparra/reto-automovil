import { Client } from "src/App-Mysql/cliente-mysql/interfaces/client.interface";
import { Seller } from "src/App-Mysql/vendedor-mysql/interfaces/seller.interface";


export interface Car {

    id: string;
    brand: string;
    model: string;
    year: number;
    seller: Seller;
    client: Client; 

}
