import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Automovil } from "src/automovil/entities/automovil.entity";

export class CreateClienteDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    bought_cars?: Automovil[];

}
