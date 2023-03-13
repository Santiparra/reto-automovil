import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

}
