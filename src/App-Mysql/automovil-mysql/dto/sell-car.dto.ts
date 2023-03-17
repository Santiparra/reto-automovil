import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class SellCarDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ example: "39f2ed1e-0828-4ec6-8ec4-a622a4f06761", description: 'uuid identificadora del Vendedor' })
    sellerId: string;

}
