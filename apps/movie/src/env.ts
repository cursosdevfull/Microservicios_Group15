import { z } from "zod";
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().default("user"),
    DB_PASS: z.string().default("password"),
    DB_NAME: z.string().default("database"),
});

type EnvSchema = z.infer<typeof envSchema>;

export const env: EnvSchema = envSchema.parse(process.env);

