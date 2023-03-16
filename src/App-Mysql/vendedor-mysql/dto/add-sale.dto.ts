import { IsUUID, IsNotEmpty } from "class-validator";

export class AddSaleDto {

    @IsUUID()
    @IsNotEmpty()
    carId: string;

    @IsUUID()
    @IsNotEmpty()
    clientId: string;

} 
