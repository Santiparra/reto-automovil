import { AutoSimple } from "src/App-Local-Version-Simple/automovil-simple/interfaces/auto-simple.interface";
import { Usuario } from "src/App-Local-Version-Simple/entities/base";

export class ClienteSimple extends Usuario {
    
    bought_cars?: AutoSimple[];

}
