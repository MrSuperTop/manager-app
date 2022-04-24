import { createTransport, getTestMessageUrl } from 'nodemailer';
import { google } from 'googleapis';
import Mail from 'nodemailer/lib/mailer';
import config from '../../config';
import { isProd } from '../../constants/isProd';
import log from '../../logger';
import { OAuth2Client } from 'google-auth-library';

let oauth2Client: OAuth2Client;

if (isProd) {
  const {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    refresh_token: refreshToken
  } = config.emails.gmail;

  oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });
}

const createTransporter = async () => {
  const transporterConfig = config.emails.nodemailer.transporter;

  if (isProd) {
    const { token } = await oauth2Client.getAccessToken();

    const transporter = createTransport({
      ...transporterConfig,
      auth: {
        ...transporterConfig.auth,
        accessToken: token
      }
    });
  
    return transporter;
  }

  const transporter = createTransport(transporterConfig);

  return transporter;
};

export const sendEmail = async (
  emailOptions: Mail.Options
) => {
  const transporter = await createTransporter();
  const email = await transporter.sendMail(emailOptions);

  if (!isProd) {
    log.info(getTestMessageUrl(email));
  }

  return email;
};
