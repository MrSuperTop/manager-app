import { TestClient } from '@nx-manager-app/test-client';
import gql from 'graphql-tag';
import { UserData } from '../types/UserData';

export const preRegister = async (
  client: TestClient,
  userData: UserData
) => {
  await client.query(gql`
    mutation Register($options: RegisterInput!) {
      register(
        input: $options
      ) {
        id
      }
    }
  `, {
    variables: {
      options: userData
    }
  });
};
