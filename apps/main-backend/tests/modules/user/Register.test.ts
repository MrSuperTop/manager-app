import { UserWithSessions } from '../../schemas/UserWithSessios';
import gql from 'graphql-tag';
import { createTestClient } from '../../utils/client';
import { verify } from 'argon2';
import { AuthCookie } from '../../schemas/AuthCookie';
import { checkSessionData } from '../../utils/checkSessionData';
import { generateUserData } from '../../utils/generateUserData';

const client = createTestClient();
const userData = generateUserData();

const getUser = async () => {
  const user = await client.app.prisma.user.findUnique({
    where: {
      username: userData.username
    },
    include: {
      sessions: true
    }
  });

  return user;
};

const send = () => {
  return client.query(gql`
    mutation Register($options: RegisterInput!) {
      register(
        input: $options
      ) {
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
  `, {
    variables: {
      options: userData
    }
  });
};

describe('User', () => {

  it('can be registered', async () => {
    const response = await send();

    const data = response.json().data.register;
    expect(UserWithSessions.parse(data)).toBeTruthy();

    expect(data.emailConfirmed).toBeFalsy();
    expect(data.authType).toBe('password');
  });

  it('has auth cookie set', async () => {
    const response = await send();

    expect(AuthCookie.parse(response.cookies)).toBeTruthy();
  });

  it('data is present in the db after registration', async () => {
    const dbObject = await getUser();

    expect(dbObject).toBeTruthy();
  });

  it('has a valid password hashed in the db', async () => {
    const { password } = await getUser();

    expect(password.startsWith('$')).toBeTruthy();
    expect(await verify(password, userData.password)).toBeTruthy();
  });
});

describe('Session', () => {
  it('data is present in redis and postgres', async () => {
    const user = await getUser();

    checkSessionData(client, user);
  });
});
