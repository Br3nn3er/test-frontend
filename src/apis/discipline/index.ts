import { Discipline } from '@models/Discipline';

import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

const BASE_URL = '/disciplinas';

export const create = async (apiService: ApiService, data: CreateData) => {
  try {
    const { data: discipline } = await apiService.axios.post<Discipline>(
      BASE_URL,
      data,
    );

    return discipline;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Discipline[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findById = async (apiService: ApiService, code: string) => {
  try {
    const { data } = await apiService.axios.get<Discipline>(
      `${BASE_URL}/${code}`,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const update = async (
  apiService: ApiService,
  code: string,
  data: UpdateData,
) => {
  try {
    const { data: discipline } = await apiService.axios.patch<Discipline>(
      BASE_URL,
      {
        codigo: code,
        ...data,
      },
    );

    return discipline;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const remove = async (apiService: ApiService, code: string) => {
  try {
    const { data } = await apiService.axios.delete(`${BASE_URL}/${code}`);

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
