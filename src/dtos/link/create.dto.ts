import { z } from 'zod';

export const CreateLinkDTO = z.object({
  original_url: z.string().url('Formato de URL inválido')
});

export type TCreateLinkDTO = z.infer<typeof CreateLinkDTO>;
