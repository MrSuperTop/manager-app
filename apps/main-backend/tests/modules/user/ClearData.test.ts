import gql from 'graphql-tag';
import { generateUserData } from '../../utils/generateUserData';
import { createTestClient } from '../../utils/client';
import { getRedisKey } from '../../../src/utils/getRedisKey';
import { preRegister } from '../../utils/preRegister';

const client = createTestClient();
const userData = generateUserData();

const send = () => {
  return client.query(gql`
    mutation ClearData {
      clearData
    }
  `);
};

describe('Clear Data', () => {
  beforeEach(async () => {
    await preRegister(client, userData);
  });

  it('returns confirmation', async () => {
    const response = await send();

    expect(response.json().data.clearData).toBeTruthy();
  });

  it('deletes all data from databases', async () => {
    const getUser = () => {
      return client.app.prisma.user.findUnique({
        where: {
          username: userData.username
        },
        select: {
          sessions: true
        }
      });
    };

    const before = await getUser();

    await send();

    const after = await getUser();

    expect(after).toBeNull();

    const session = before.sessions[0];
    const { key } = getRedisKey('sessionData', session.id.toString());

    const data = await client.app.redis.get(key);

    expect(data).toBeFalsy();
  });
});
