import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteMysqlDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Santiago Iparraguirre", description: 'Nombre completo del Cliente' })
    name: string;
    
}
