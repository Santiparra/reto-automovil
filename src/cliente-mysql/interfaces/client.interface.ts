import { Car } from "src/automovil-mysql/interfaces/car.interface";

export interface Client {

    id: string;
    name: string;
    bought_cars?: Car[]; 
    sold_cars?: Car[];

}
