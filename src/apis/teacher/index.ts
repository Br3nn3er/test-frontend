import { Teacher } from '@models/Teacher';

import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

const BASE_URL = '/professores';

export const create = async (apiService: ApiService, data: CreateData) => {
  try {
    const { data: teacher } = await apiService.axios.post<Teacher>(
      BASE_URL,
      data,
    );

    return teacher;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Teacher[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findBySiape = async (apiService: ApiService, siape: string) => {
  try {
    const { data } = await apiService.axios.get<Teacher>(
      `${BASE_URL}/${siape}`,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const update = async (
  apiService: ApiService,
  siape: string,
  data: UpdateData,
) => {
  try {
    const { data: teacher } = await apiService.axios.patch<Teacher>(BASE_URL, {
      siape,
      ...data,
    });

    return teacher;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const remove = async (apiService: ApiService, siape: string) => {
  try {
    const { data } = await apiService.axios.delete(`${BASE_URL}/${siape}`);

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
