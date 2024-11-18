import { z } from 'zod';

export const SearchUserDTO = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(100, 'A senha pode ter no máximo 100 caracteres')
});

export type TSearchUserDTO = z.infer<typeof SearchUserDTO>;
