import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    URL_APPOINTMENT: z.string().default("localhost"),
    URL_PATIENT: z.string().default("localhost"),
    URL_AUTH: z.string().default("localhost"),
});

type EnvSchema = z.infer<typeof envSchema>;

export const env: EnvSchema = envSchema.parse(process.env);
