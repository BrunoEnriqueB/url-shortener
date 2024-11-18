import { z } from 'zod';

export const DeleteLinkDto = z.object({
  id: z.coerce.number(),
  user_id: z.number()
});

export type TDeleteLinkDto = z.infer<typeof DeleteLinkDto>;
