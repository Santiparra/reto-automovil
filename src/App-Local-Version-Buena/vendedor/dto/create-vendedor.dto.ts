import { IsNotEmpty, IsString } from "class-validator";

export class CreateVendedorDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
}
