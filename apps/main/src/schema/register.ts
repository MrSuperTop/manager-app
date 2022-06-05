import { z } from 'zod';

export const registerSchema = z.object({
  password: z.string().min(8).max(2048),
  username: z.string().min(4).max(255),
  email: z.string().email({
    message: 'should be valid'
  })
});
