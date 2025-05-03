import type { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { PatientCreateDTO } from "./dtos/patient-create.dto";
import { Patient, PatientApplication } from "../application";
import { PatientService } from './patient.service';
import { PatientEmailDTO } from "./dtos/patient-email";
import { PatientIdDTO } from "./dtos/patient-id.dto";


export class PatientController {
    constructor(private readonly application: PatientApplication) { }

    async create(request: Request, response: Response) {
        const patientDto = plainToInstance(PatientCreateDTO, request.body);
        const errors = await validate(patientDto)

        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            const patient = new Patient({ ...request.body, password: await PatientService.crypt(request.body.password) });
            const patientCreated = await this.application.create(patient);
    
            response.status(201).json({ status: 201, message: 'Patient created', createdAt: patientCreated.properties.createdAt });
        }
    }

    async getByEmail(request: Request, response: Response) {
        const patientEmailDto = plainToInstance(PatientEmailDTO, request.params);
        const errors = await validate(patientEmailDto)

        if(errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            const { email } = request.params;
            const patient = await this.application.getByEmail(email);
    
            if (!patient) {
                response.status(404).json({ status: 404, message: 'Patient not found' });
            } else {
                response.status(200).json({ status: 200, message: 'Patient found', patient });
            }
        }

    }

    async getById(request: Request, response: Response) {
        const patientIdDto = plainToInstance(PatientIdDTO, request.params);
        const errors = await validate(patientIdDto)

        if (errors.length > 0) {
            response.status(411).json({ status: 400, message: 'Validation error', errors });
        } else {
            const { patientId } = request.params;
            const patient = await this.application.getById(Number(patientId));
    
            if (!patient) {
                response.status(404).json({ status: 404, message: 'Patient not found' });
            } else {
                response.status(200).json({ status: 200, message: 'Patient found', patient });
            }
        }

    }


}