import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z
    .union([
      z.literal('DEVELOPMENT'),
      z.literal('TESTING'),
      z.literal('PRODUCTION'),
      z.literal('test')
    ])
    .default('DEVELOPMENT'),
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_USER: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  API_URL: z.string().default('http://localhost:3000')
});

const env: z.infer<typeof envSchema> = envSchema.parse(process.env);

export default env;
