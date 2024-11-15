import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  NODE_ENV: z
    .union([
      z.literal('DEVELOPMENT'),
      z.literal('TESTING'),
      z.literal('PRODUCTION')
    ])
    .default('DEVELOPMENT'),
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_USER: z.string(),
  DB_NAME: z.string(),
  API_URL: z.string().default('http://localhost:3000')
});

const env: z.infer<typeof envSchema> = envSchema.parse(process.env);

export default env;
