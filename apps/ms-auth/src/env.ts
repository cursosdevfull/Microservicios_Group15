import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    JWT_SECRET: z.string().default("12345"),
    JWT_EXPIRATION: z.string().default("2h"),
    SERVICE_NAME_PATIENT: z.string().default("user")
});

type EnvSchema = z.infer<typeof envSchema>;

export const env: EnvSchema = envSchema.parse(process.env);
