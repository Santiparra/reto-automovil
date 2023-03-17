import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateAutomovilMysqlDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Toyota", description: 'Marca del auto' })
    brand: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Corolla", description: 'Modelo del auto' })
    model: string;
   
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ example: 1997, description: 'Año en que se fabrico el auto' })
    year: number;
    
}
