import env from '@/config/environment';
import { z } from 'zod';

export const SearchLinkDTO = z.object({
  original_url: z.string().url('Formato de URL inválido'),
  shortened_url: z.string().length(env.MAX_LENGTH_OF_URL)
});

export type TSearchLinkDTO = z.infer<typeof SearchLinkDTO>;
