import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateVendedorSimpleDto {
   
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Georgina Gonzales", description: 'Nombre completo del Vendedor' })
    name: string;
    
}
