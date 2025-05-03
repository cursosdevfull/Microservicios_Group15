import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { AppointmentCountry } from '../../application/appointment-country.enum';

export class AppointmentCreateDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    patientId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    scheduleId: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(AppointmentCountry)
    countryISO: string;
}