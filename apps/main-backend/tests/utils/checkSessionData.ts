import { TestClient } from '@nx-manager-app/test-client';
import { Session, User } from '@prisma/client';
import { getRedisKey } from '../../src/utils/getRedisKey';

export const checkSessionData = async (
  client: TestClient,
  user: User & {
    sessions: Session[]
  }
) => {
  const session = user.sessions[0];

  expect(session).toBeTruthy();
  expect(session.userId).toBe(user.id);
  expect(session.userAgent).toEqual('lightMyRequest');

  const { key } = getRedisKey('sessionData', session.id.toString());
  const redisData = JSON.parse(await client.app.redis.get(key));

  expect(redisData).toBeTruthy();
  expect(redisData.userId).toBe(user.id);
};
