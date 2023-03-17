import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteSimpleDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Georgina Gonzales", description: 'Nombre completo del Cliente' })
    name: string;
    
}
