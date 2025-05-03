import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";
import { PatientGenre } from '../../application/patient-genre.enum';

export class PatientIdDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    patientId: number
}