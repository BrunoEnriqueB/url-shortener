import { z } from 'zod';

export const CreateLinkAccessDTO = z.object({
  ip_address: z.string().ip(),
  user_agent: z.string(),
  metadata: z.any(),
  link_id: z.number()
});

export type TCreateLinkAccessDTO = z.infer<typeof CreateLinkAccessDTO>;
