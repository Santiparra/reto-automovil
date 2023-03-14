import { Cliente } from "src/App-Local-Version-Buena/cliente/interfaces/cliente.interface";
import { Vendedor } from "src/App-Local-Version-Buena/vendedor/interfaces/vendedor.interface";


export interface Automovil {

    id: string;
    brand: string;
    model: string;
    year: number;
    seller: Vendedor[];
    client?: Cliente[]; 

}
