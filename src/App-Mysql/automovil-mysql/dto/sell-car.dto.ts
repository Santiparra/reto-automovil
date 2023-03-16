import { IsNotEmpty, IsUUID } from "class-validator";

export class SellCarDto {

    @IsUUID()
    @IsNotEmpty()
    sellerId: string;

}
