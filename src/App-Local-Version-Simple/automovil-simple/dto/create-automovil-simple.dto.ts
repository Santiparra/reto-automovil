import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt, IsUUID, IsOptional } from "class-validator";

export class CreateAutomovilSimpleDto {
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
   
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ 
        example: "39f2ed1e-0828-4ec6-8ec4-a622a4f06761", 
        description: `Uuid identificadora del Vendedor` 
    })
    seller: string;
   
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ 
        example: "39f2ed1e-0828-4ec6-8ec4-a622a4f06761", 
        description: `Uuid identificadora del cliente` 
    })
    client?: string;
}
