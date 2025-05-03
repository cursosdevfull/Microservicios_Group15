import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { AppointmentCountry } from '../../application/appointment-country.enum';

export class AppointmentCreateDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    patientId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    scheduleId: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(AppointmentCountry)
    countryISO: string;
}