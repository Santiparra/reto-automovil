import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateVendedorDto } from './create-vendedor.dto';

export class UpdateVendedorDto extends PartialType(CreateVendedorDto) {
    @IsString()
    @IsNotEmpty()
    name: string;
}
