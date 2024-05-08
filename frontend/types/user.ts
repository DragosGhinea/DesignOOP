export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string | null;
  // eslint-disable-next-line no-use-before-define
  linkedProviders?: LinkedProviders[];
}

export interface LinkedProviders {
  id: string;
  user: User;
  userId: string;
  providerUserId: string;
  provider: string;
  linkingDatetime: Date;
}
