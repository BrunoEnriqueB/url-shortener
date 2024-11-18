import env from '@/config/environment';
import { z } from 'zod';

export const FindLinkDTO = z.object({
  shortened_url: z.string().length(env.MAX_LENGTH_OF_URL)
});

export type TFindLinkDTO = z.infer<typeof FindLinkDTO>;
