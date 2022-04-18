export interface UserEmail {
  email: string,
  verified: boolean,
  primary: boolean
}

export type UserEmails = UserEmail[] | undefined;
