import { UserWithSessions } from '../../schemas/UserWithSessios';
import gql from 'graphql-tag';
import { createTestClient } from '../../utils/client';
import { omit } from 'lodash';
import { generateUserData } from '../../utils/generateUserData';
import { preRegister } from '../../utils/preRegister';

const client = createTestClient();
const userData = generateUserData();

const send = () => {
  return client.query(gql`
    query Me {
      me {
        id
        email
        username
        authType
        emailConfirmed
        sessions {
          id
          userAgent
          createdAt
        }
      }
    }
  `);
};

describe('Me', () => {
  afterEach(() => {
    client.clearCookies();
  });

  it('returns valid user data which correponds to the data entered in register mutation', async () => {
    await preRegister(client, userData);

    const response = await send();

    const data = response.json().data.me;
  
    expect(UserWithSessions.parse(data)).toBeTruthy();
    expect(data).toMatchObject(omit(userData, 'password'));
  });

  it('returns an error if not auth', async () => {
    const response = await send();

    expect(response.json().errors).toBeTruthy();
  });
});
