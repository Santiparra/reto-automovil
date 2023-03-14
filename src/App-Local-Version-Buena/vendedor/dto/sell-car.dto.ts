import { IsNotEmpty, IsUUID } from "class-validator";

export class SellCarInfo {
    
    @IsUUID()
    @IsNotEmpty()
    carId: string;

    @IsUUID()
    @IsNotEmpty()
    clientId: string;
}