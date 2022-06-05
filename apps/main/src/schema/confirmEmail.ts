import { z } from 'zod';

export const confirmEmailSchema = z.object({
  code: z.string().array().length(6, {
    message: 'has to be 6 numbers long'
  })
});
