import z from 'zod';

export const UserWithSessions = z.object({
  authType: z.string(),
  email: z.string().email(),
  emailConfirmed: z.boolean(),
  sessions: z.array(z.object({
    id: z.number(),
    createdAt: z.string(),
    userAgent: z.string()
  }))
});
