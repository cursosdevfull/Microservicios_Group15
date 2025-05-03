import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";
import { PatientGenre } from '../../application/patient-genre.enum';

export class PatientEmailDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MinLength(3)
    email: string;
}