import { User } from '@models/User';
import ApiService from '@services/ApiService';

import { SignInCredentials, SignInResponse } from './types';

export const login = async (
  apiService: ApiService,
  { email, password }: SignInCredentials,
) => {
  try {
    const { data } = await apiService.axios.post<SignInResponse>('/sessions', {
      email,
      password,
    });

    apiService.setTokenHeader(data.token);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);

    throw e;
  }
};

export const me = async (apiService: ApiService) => {
  const { data } = await apiService.axios.get<User>('/users/me');
  return data;
};
