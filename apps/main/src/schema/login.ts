import { z } from 'zod';

export const loginSchema = z.object({
  password: z.string().min(8).max(2048),
  usernameOrEmail: z.string().min(4).max(255)
});
