import { User } from "./abstract-user.entity";
import { Entity, OneToMany } from "typeorm";
import { CarMysql } from "./car.entity";


@Entity({ name: "clients" })
export class ClientMysql extends User{

    @OneToMany( () => CarMysql, carMysql => carMysql.client )
    bought_cars: CarMysql[] 
    
}