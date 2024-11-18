import { z } from 'zod';

export const ListLinksDto = z.object({
  id: z.number().optional(),
  user_id: z.number()
});

export type TListLinksDto = z.infer<typeof ListLinksDto>;
