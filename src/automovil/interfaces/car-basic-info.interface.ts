import { Cliente } from "src/cliente/interfaces/cliente.interface";

export interface AutomovilInfoBasica {

    id: string;
    brand: string;
    model: string;
    year: number;
    client?: Cliente[]; 

}