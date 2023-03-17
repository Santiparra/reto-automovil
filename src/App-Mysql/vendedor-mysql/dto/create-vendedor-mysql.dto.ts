import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVendedorMysqlDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Javier Mendez", description: 'Nombre completo del Vendedor' })
    name: string;
    
}
