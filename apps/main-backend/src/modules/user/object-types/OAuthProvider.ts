import { registerEnumType } from 'type-graphql';

export const OAuthProvider = {
  google: 'google',
  discord: 'discord',
  github: 'github'
} as const;

registerEnumType(OAuthProvider, {
  name: 'OAuthProvider'
});

export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider];
