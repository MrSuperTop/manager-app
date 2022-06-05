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

export const invalidCredentialsError = new ErrorWithProps('Invalid login cretentials', {
  code: 'INVALID_CRETENDIALS',
  fields: ['usernameOrEmail', 'password'],
  timestamp: new Date().toISOString()
});

export const invalidCodeError = new ErrorWithProps('Invalid oauth code provided', {
  code: 'INVALID_OAUTH_CODE',
  timestamp: new Date().toISOString()
});

export const alreadyTakenError = new ErrorWithProps('This username or email is taken', {
  code: 'INVALID_DATA',
  fields: ['username', 'email'],
  timestamp: new Date().toISOString()
});

