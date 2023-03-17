import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVendedorDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Georgina Gonzales", description: 'Nombre completo del Vendedor' })
    name: string;
    
}
