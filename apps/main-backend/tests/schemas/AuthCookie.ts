import z from 'zod';

export const AuthCookie = z.array(z.object({
  name: z.string(),
  value: z.string(),
  maxAge: z.number(),
  path: z.string(),
  httpOnly: z.boolean(),
  sameSite: z.string()
}));
