import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateAutomovilMysqlDto {
    
    @IsString()
    @IsNotEmpty()
    brand: string;
    
    @IsString()
    @IsNotEmpty()
    model: string;
   
    @IsInt()
    @IsNotEmpty()
    year: number;
    
}
