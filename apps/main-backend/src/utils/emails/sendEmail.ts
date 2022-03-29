import { createTransport, getTestMessageUrl } from 'nodemailer';
import { google } from 'googleapis';
import Mail from 'nodemailer/lib/mailer';
import config from '../../config';
import { isProd } from '../../constants/isProd';
import log from '../../logger';

const getAccessToken = async () => {
  const {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    refresh_token: refreshToken
  } = config.emails.gmail;

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        log.error(err, 'Wasn\'t able to get an accessToken from gmail api to send an email');
        reject(err);
      }

      resolve(token);
    });
  });

  return accessToken;
};

const createTransporter = async () => {
  const transporterConfig = config.emails.nodemailer.transporter;

  if (isProd) {
    const accessToken = await getAccessToken();
    const transporter = createTransport({
      ...transporterConfig,
      auth: {
        ...transporterConfig.auth,
        accessToken: accessToken
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
