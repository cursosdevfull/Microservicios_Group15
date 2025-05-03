import type { Request, Response } from "express";
import { GatewayApplication } from "../application";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppointmentCreateDTO } from "./dtos/appointment-create.dto";
import { PatientCreateDTO } from "./dtos/patient-create.dto";
import { AuthLoginDto } from "./dtos/auth-login.dto";

export class GatewayController {
    constructor(private readonly application: GatewayApplication) { }

    async bookAppointment(request: Request, response: Response) {
        const appointmentDto = plainToInstance(AppointmentCreateDTO, request.body);
        const errors = await validate(appointmentDto)
        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            const appointmentCreated = await this.application.bookAppointment(appointmentDto.patientId, appointmentDto.scheduleId, appointmentDto.countryISO);
    
            response.status(201).json(appointmentCreated);
        }
    }

    async createPatient(request: Request, response: Response) {
        const patientDto = plainToInstance(PatientCreateDTO, request.body);
        const errors = await validate(patientDto)
        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            const patientCreated = await this.application.createPatient(patientDto.names, patientDto.lastname, patientDto.email, patientDto.password, patientDto.age, patientDto.genre);
    
            response.status(201).json(patientCreated);
        }
    }

    async login(request: Request, response: Response) {
        const authDto = plainToInstance(AuthLoginDto, request.body);
        const errors = await validate(authDto)

        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            const patientCreated = await this.application.login(authDto.email, authDto.password);

            response.status(201).json(patientCreated);
        }
    }


}