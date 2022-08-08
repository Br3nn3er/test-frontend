import { User } from '@models/User';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignInResponse = {
  refresh_token: string;
  token: string;
  user: User;
};
