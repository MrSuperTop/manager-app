import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { googleUserFields } from '../../types/googleUserFields';
import { invalidCodeError } from '../../constants/errors';

const people = google.people('v1');

export const getGoogleAccountInfo = async (
  auth: OAuth2Client,
  code: string,
  fields: googleUserFields[]
) => {
  try {
    const { tokens } = await auth.getToken(code);
    auth.credentials = tokens;
  } catch (error) {
    throw invalidCodeError;
  }

  const res = await people.people.get({
    resourceName: 'people/me',
    personFields: fields.join(',')
  });

  return res.data;
};
