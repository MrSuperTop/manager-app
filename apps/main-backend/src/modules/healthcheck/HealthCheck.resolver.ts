import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HealthCheckResolver {
  @Query(() => String)
  async healthCheck () {
    return 'OK';
  }
}
