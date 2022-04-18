import { UserEmails } from './types/UserEmails';

export abstract class Client<T extends UserEmails> {
  abstract getEmails(): Promise<T>;
}

export abstract class Method<T extends UserEmails = UserEmails> {
  abstract name: string;
  public isAuthenticated = false;

  abstract authenticate(code: string): Promise<Client<T>>;
  abstract getAuthUrl(scopes?: string[]): string;
}
