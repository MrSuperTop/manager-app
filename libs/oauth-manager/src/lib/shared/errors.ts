import { DetailedError } from '../utils/DetailedError';

export const InvalidCode = new DetailedError('Invalid oauth code was provided', 'INVALID_CODE');
export const NoEmailsData = new DetailedError('Couldn\'t retrieve user email data', 'NO_EMAILS_DATA');
export const InvalidMethodName = (name: string) => (
  new DetailedError(
    `Method with name ${name} was not applied to this instance with "use" method`,
    'INVALID_METHOD_NAME'
  )
); 
