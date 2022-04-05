import { Query, Resolver } from 'type-graphql';
import { getAuthUrls } from '../../../utils/getAuthUrls';
import { AuthUrls } from '../object-types/AuthUrls';
import { googleAuth } from './oauth/shared/auth';

@Resolver()
export class AuthUrlsResolver {
  @Query(() => AuthUrls)
  authUrls () {
    const urls = getAuthUrls(googleAuth, {
      google: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/profile.emails.read'
      ],
      github: [
        'user:email'
      ]
    });

    return urls;
  }
}
