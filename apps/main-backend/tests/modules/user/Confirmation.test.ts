import { getRedisKey } from '../../../src/utils/getRedisKey';
import gql from 'graphql-tag';
import { ConfirmationData } from '../../schemas/ConfirmationData';
import { createTestClient } from '../../utils/client';
import { generateUserData } from '../../utils/generateUserData';
import { preRegister } from '../../utils/preRegister';

const client = createTestClient();
const userData = generateUserData();
let shared: {
  code: string,
  token: string
};

describe('Confirmation', () => {
  beforeAll(async () => {
    await preRegister(client, userData);
  });

  it('resolver saves data about an email', async () => {
    const response = await client.query(gql`
      mutation SendConfirmation {
        sendConfirmation
      }
    `);

    const data = response.json().data;

    expect(data).toBeTruthy();

    const { key } = getRedisKey('registrationConfirmation', data.sendConfirmation);
    const redisData = JSON.parse(await client.app.redis.get(key));

    expect(ConfirmationData.parse(redisData)).toBeTruthy();

    shared = {
      code: redisData.code,
      token: data.sendConfirmation
    };
  });

  it('second resolver sets the confirmedEmail property for the user to true', async () => {
    const response = await client.query(gql`
      mutation ConfirmEmail($options: ConfirmEmailInput!) {
        confirmEmail(input: $options)
      }
    `, {
      variables: {
        options: shared
      }
    });

    expect(response.json().data).not.toBeNull();
    expect(response.json().data.confirmEmail).toBeTruthy();

    const user = await client.app.prisma.user.findUnique({
      where: {
        username: userData.username
      }
    });

    expect(user.emailConfirmed).toBeTruthy();
  });
});
