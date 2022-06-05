import { UseQueryResponse } from 'urql';
import { MeQuery, useMeQuery } from '../generated/graphql';

interface CustomProperties {
  user: MeQuery['me'],
  isLoggedIn: boolean
}

export const useUserData = (): UseQueryResponse<MeQuery, object>[0] & CustomProperties => {
  const response = useMeQuery();

  const dataPart = response[0];
  const containsUserData = !!dataPart.data?.me;

  const updatedData = {
    ...dataPart,
    user: containsUserData ? dataPart.data.me : null,
    isLoggedIn: containsUserData
  };

  return updatedData;
};
