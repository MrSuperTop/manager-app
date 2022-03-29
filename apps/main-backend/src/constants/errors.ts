import mercurius from 'mercurius';

const { ErrorWithProps } = mercurius;

export const alreadyLoggedInError = new ErrorWithProps('You are already logged in', {
  code: 'ALREADY_LOGGED_IN',
  timestamp: new Date().toISOString()
});

export const alreadyConfirmedEmail = new ErrorWithProps('Your email is already confirmed', {
  code: 'ALREADY_CONFIRMED_EMAIL',
  timestamp: new Date().toISOString()
});

export const tokenExpiredError = new ErrorWithProps('Your token has expired, try again', {
  code: 'TOKEN_EXPIRED',
  timestamp: new Date().toISOString()
});

export const userDoesNotExistsError = new ErrorWithProps('This user doesn\'t exists', {
  code: 'USER_DOES_NOT_EXISTS',
  timestamp: new Date().toISOString()
});
