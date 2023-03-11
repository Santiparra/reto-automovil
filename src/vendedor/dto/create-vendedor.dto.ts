import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Automovil } from "src/automovil/entities/automovil.entity";

export class CreateVendedorDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsArray()
    @IsNotEmpty()
    sold_cars: Automovil[];
}
