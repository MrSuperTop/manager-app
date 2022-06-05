import axios from 'axios';
import { z } from 'zod';
import { Client, Method } from '../../src/lib/Method';
import { UserEmails } from '../../src/lib/types/UserEmails';

const emailsSchema = z.array(z.object({
  email: z.string(),
  primary: z.boolean(),
  verified: z.boolean()
}));

export const getMethodFunctions = (
  method: Method<'discord' | 'google' | 'github', UserEmails>,
  code: string
) => {
  let client: Client<UserEmails>;

  return {
    validUrl: async () => {
      const url = method.getAuthUrl();
      const response = await axios.get(url);

      expect(url).toBeTruthy();
      expect(response.status).toBe(200);
    },
    validClient: async () => {
      client = await method.authenticate(code);
  
      expect(client).toBeTruthy();
      expect(method.isAuthenticated).toBeTruthy();
      expect(client).toBeInstanceOf(Client);
    },
    returnsEmail: async () => {
      const emails = await client.getEmails();
  
      expect(emailsSchema.parse(emails)).toBeTruthy();
    }
  };
};
