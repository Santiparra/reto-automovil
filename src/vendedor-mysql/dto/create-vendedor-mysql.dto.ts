import { IsNotEmpty, IsString } from "class-validator";

export class CreateVendedorMysqlDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
}
