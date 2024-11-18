import { z } from 'zod';

export const SearchLinkDTO = z.object({
  original_url: z.string().url('Formato de URL inválido'),
  shortened_url: z.string().length(6)
});

export type TSearchLinkDTO = z.infer<typeof SearchLinkDTO>;
