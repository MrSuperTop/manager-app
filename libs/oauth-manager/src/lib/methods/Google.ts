import { Client, Method } from '../Method';
import { UserEmails } from '../types/UserEmails';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { InvalidCode, NoEmailsData } from '../shared/errors';

const people = google.people('v1');

export interface GoogleMethodOptions {
  clientId: string,
  clientSecret: string,
  redirect: string
}

class GoogleClient extends Client<UserEmails> {
  async getEmails (): Promise<UserEmails> {
    const response = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses'
    });

    if (!response.data.emailAddresses) {
      return [];
    }
    
    const formattedData = [];
    for (const email of response.data.emailAddresses) {
      if (!email.value) {
        throw NoEmailsData;
      }

      formattedData.push({
        email: email.value,
        verified: email.metadata?.verified as boolean,
        primary: email.metadata?.primary as boolean
      });
    }

    return formattedData;
  }
}

export class GoogleMethod extends Method<'google'> {
  public name = 'google' as const;
  private googleClient: OAuth2Client;

  constructor (options: GoogleMethodOptions) {
    super();

    this.googleClient = new google.auth.OAuth2(
      ...Object.values(options)
    );

    google.options({ auth: this.googleClient });
  }

  getAuthUrl(scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/profile.emails.read'
  ]): string {
    const url = this.googleClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes
    });

    return url;
  }

  async authenticate(code: string): Promise<GoogleClient> {
    try {
      const { tokens } = await this.googleClient.getToken(code);

      this.googleClient.credentials = tokens;
      this.isAuthenticated = true;

      return new GoogleClient();
    } catch (error) { 
      throw InvalidCode;
    }
  }
}
