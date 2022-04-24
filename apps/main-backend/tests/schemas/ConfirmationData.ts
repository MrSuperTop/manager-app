import { z } from 'zod';

export const ConfirmationData = z.object({
  code: z.string()
});
