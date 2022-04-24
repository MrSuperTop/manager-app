import { getRedisKey } from '../../../src/utils/getRedisKey';
import gql from 'graphql-tag';
import { createTestClient } from '../../utils/client';
import { generateUserData } from '../../utils/generateUserData';
import { preRegister } from '../../utils/preRegister';

const client = createTestClient();
const userData = generateUserData();

const send = () => {
  return client.query(gql`
    mutation Logout {
      logout
    }
  `);
};

describe('Logout', () => {
  beforeAll(async () => {
    await preRegister(client, userData);
  });

  beforeEach(async () => {
    await client.query(gql`
      mutation Login($options: LoginInput!) {
        login(
          input: $options
        ) {
          id
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
  });

  afterEach(() => {
    client.clearCookies();
  });

  it('should return a boolean value if everyting is OK', async () => {
    const response = await send();

    expect(response.json().data.logout).toBeTruthy();
  });

  it('should delete all session data', async () => {
    const userBeforeLogout = await client.app.prisma.user.findUnique({
      where: {
        username: userData.username
      },
      select: {
        sessions: true
      }
    });

    await send();

    const user = await client.app.prisma.user.findUnique({
      where: {
        username: userData.username
      },
      include: {
        sessions: true
      }
    });

    expect(user.sessions).toHaveLength(0);

    const { key } = getRedisKey('sessionData', userBeforeLogout.sessions[0].id.toString());
    const redisData = await client.app.redis.get(key);

    expect(redisData).toBeFalsy();
  });
});

it('should say that not auth', async () => {
  const response = await send();

  expect(response.json().errors).toBeTruthy();
});
