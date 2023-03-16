import { 
    Column, 
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, 
} from "typeorm";
import { ClientMysql } from "./client.entity";
import { SellerMysql } from "./seller.entity";

@Entity({ name: "cars" })
export class CarMysql {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @ManyToOne( () => SellerMysql, seller => seller.sold_cars, {onDelete: "SET NULL"} )
    @JoinColumn()
    seller: SellerMysql

    @ManyToOne( () => ClientMysql, client => client.bought_cars, {onDelete: "SET NULL"} )
    @JoinColumn()
    client: ClientMysql 

}
