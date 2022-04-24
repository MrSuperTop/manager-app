import gql from 'graphql-tag';
import { createTestClient } from './utils/client';

const client = createTestClient();

it('Server is up', async () => {
  const response = await client.query(gql`
    query HealthCheck {
      healthCheck
    }
  `);

  expect(response.json()).toStrictEqual({ data: { healthCheck: 'OK' } });
});
