import { Cliente } from "src/cliente/entities/cliente.entity";

export interface AutomovilInfoBasica {

    id: string;
    brand: string;
    model: string;
    year: number;
    client?: Cliente[]; 

}