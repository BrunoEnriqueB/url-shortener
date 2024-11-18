import logger from '@/config/logger';
import { z } from 'zod';

export const CreateLinkDTO = z.object({
  original_url: z
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

export type TCreateLinkDTO = z.infer<typeof CreateLinkDTO>;
