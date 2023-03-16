import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class AssignCarToClient {
    
    @IsUUID()
    @IsNotEmpty()
    clientId: string;

}