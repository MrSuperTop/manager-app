import config, { namespaces } from '../config';
import { v4 as uuid } from 'uuid';

export const getRedisKey = (
  namespace: namespaces,
  customToken: string = uuid()
) => {
  const namespaceData = config.redis.namespaces[namespace];

  return {
    token: customToken,
    key: `${namespaceData.prefix}:${customToken}`,
    expires: namespaceData.expires
  };
};
