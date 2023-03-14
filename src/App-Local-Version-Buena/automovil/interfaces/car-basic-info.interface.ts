import { Cliente } from "src/App-Local-Version-Buena/cliente/interfaces/cliente.interface";

export interface AutomovilInfoBasica {

    id: string;
    brand: string;
    model: string;
    year: number;
    client?: Cliente[]; 

}