import { login, me } from '@apis/auth';
import { SignInCredentials, SignInResponse } from '@apis/auth/types';

import { API } from '@contexts/ApiContext/types';

import { User } from '@models/User';

export interface AuthApi {
  login(credentials: SignInCredentials): Promise<SignInResponse>;
  me(): Promise<User>;
}

export const getAuthApi: API<AuthApi> = apiService => ({
  login: (credentials: SignInCredentials) => login(apiService, credentials),
  me: () => me(apiService),
});
