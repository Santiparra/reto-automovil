import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class AgregarVenta {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ example: "39f2ed1e-0828-4ec6-8ec4-a622a4f06761", description: 'uuid identificadora del Auto' })
    carId: string;

} 