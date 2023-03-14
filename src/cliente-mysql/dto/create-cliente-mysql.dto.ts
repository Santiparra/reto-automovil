import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteMysqlDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
}
