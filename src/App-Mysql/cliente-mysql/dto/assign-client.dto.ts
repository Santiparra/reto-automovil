import { IsNotEmpty, IsUUID } from "class-validator";

export class AssignClientToCar {
    
    @IsUUID()
    @IsNotEmpty()
    carId: string;

}