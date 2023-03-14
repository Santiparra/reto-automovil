import { User } from "./abstract-user.entity";
import { Entity, OneToMany } from "typeorm";
import { CarMysql } from "./car.entity";

@Entity({ name: "sellers" })
export class SellerMysql extends User {
    
    @OneToMany( () => CarMysql, carMysql => carMysql.seller )
    sold_cars: CarMysql[]   
    
}