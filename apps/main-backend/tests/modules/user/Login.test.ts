import { UserWithSessions } from '../../schemas/UserWithSessios';
import gql from 'graphql-tag';
import { createTestClient } from '../../utils/client';
import { hash } from 'argon2';
import { AuthCookie } from '../../schemas/AuthCookie';
import { checkSessionData } from '../../utils/checkSessionData';
import { generateUserData } from '../../utils/generateUserData';
import { Prisma } from '@prisma/client';

const client = createTestClient();
const userData = generateUserData();
let userId: number;

const send = () => {
  return client.query(gql`
    mutation Login($options: LoginInput!) {
      login(
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
      options: {
        usernameOrEmail: userData.email,
        password: userData.password
      }
    }
  });
};

const updateUser = async (
  replaced: Partial<Prisma.UserCreateInput> = {}
) => {
  const user = await client.app.prisma.user.update({
    where: {
      id: userId
    },
    data: {
      ...userData,
      password: await hash(userData.password),
      ...replaced
    }
  });

  return user;
};

describe('Login', () => {
  beforeAll(async () => {
    const user = await client.app.prisma.user.create({
      data: {
        ...userData,
        password: await hash(userData.password)
      }
    });

    userId = user.id;
  });

  afterEach(() => {
    client.clearCookies();
  });
  it('returns proper user data', async () => {
    await updateUser();

    const response = await send();
  
    expect(UserWithSessions.parse(response.json().data.login)).toBeTruthy();
  });

  it('errors if password is wrong', async () => {
    await updateUser({
      password: await hash('')
    });

    const response = await send();

    expect(response.json().errors).toBeTruthy();
  });

  it('errors if authType is wrong', async () => {
    await updateUser({
      authType: 'oauth'
    });

    const response = await send();

    expect(response.json().errors).toBeTruthy();
  });

  it('works the same way when email or username provided', async () => {
    const send = (uniqueValue: string) => {
      return client.query(gql`
        mutation Login($options: LoginInput!) {
          login(
            input: $options
          ) {
            id
            email
            username
            authType
            emailConfirmed
          }
        }
      `, {
        applyCookies: false,
        variables: {
          options: {
            usernameOrEmail: uniqueValue,
            password: userData.password
          }
        }
      });
    };

    const firstResponse = await send(userData.email);
    const secondResponse = await send(userData.username);

    expect(firstResponse.json()).toStrictEqual(secondResponse.json());
  });

  it('sets auth cookie', async () => {
    const response = await send();

    expect(AuthCookie.parse(response.cookies)).toBeTruthy();
  });
});

describe('Session', () => {
  it('data is present in redis and postgres', async () => {
    const user = await client.app.prisma.user.findUnique({
      where: {
        username: userData.username
      },
      include: {
        sessions: true
      }
    });

    checkSessionData(client, user);
  });
});
