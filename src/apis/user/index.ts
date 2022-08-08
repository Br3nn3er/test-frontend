import { User } from '@models/User';

import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

const BASE_URL = '/users';

export const create = async (apiService: ApiService, data: CreateData) => {
  try {
    const { data: user } = await apiService.axios.post<User>(BASE_URL, data);

    return user;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<User[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findById = async (apiService: ApiService, id: string) => {
  try {
    const { data } = await apiService.axios.get<User>(`${BASE_URL}/${id}`);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const update = async (
  apiService: ApiService,
  id: string,
  data: UpdateData,
) => {
  try {
    const { data: user } = await apiService.axios.patch<User>(BASE_URL, {
      ...data,
      id,
    });

    return user;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const remove = async (apiService: ApiService, id: string) => {
  try {
    const { data } = await apiService.axios.delete(`${BASE_URL}/${id}`);

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
