import logger from '@/config/logger';
import { z } from 'zod';

export const UpdateLinkDto = z.object({
  id: z.coerce.number(),
  user_id: z.number(),
  new_url: z
    .string()
    .url('Formato de URL inválido')
    .transform((value) => {
      try {
        const decodedUrl = decodeURIComponent(value);
        return decodedUrl;
      } catch (error) {
        logger.error(`Error decoding original url: ${JSON.stringify(error)}`);

        return value;
      }
    })
});

export type TUpdateLinkDto = z.infer<typeof UpdateLinkDto>;
