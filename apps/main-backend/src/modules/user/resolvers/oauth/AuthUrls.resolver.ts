import { Query, Resolver } from 'type-graphql';
import { AuthUrls } from '../../object-types/AuthUrls';
import { manager } from './shared/auth';

@Resolver()
export class AuthUrlsResolver {
  @Query(() => AuthUrls)
  authUrls () {
    return manager.getAuthUrls();
  }
}
