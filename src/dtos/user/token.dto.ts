import { z } from 'zod';

export const TokenUserDTO = z.object({
  id: z.number(),
  email: z.string().email('Formato de e-mail inválido')
});

export type TTokenUserDTO = z.infer<typeof TokenUserDTO>;
