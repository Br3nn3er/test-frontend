import { Class } from '@models/Class';

import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

const BASE_URL = '/turmas';

export const create = async (apiService: ApiService, data: CreateData) => {
  try {
    const { data: clazz } = await apiService.axios.post<Class>(BASE_URL, data);

    return clazz;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Class[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const listBySemesterId = async (
  apiService: ApiService,
  semesterId: number,
) => {
  try {
    const { data } = await apiService.axios.get<Class[]>(BASE_URL, {
      params: { semesterId },
    });
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findById = async (apiService: ApiService, id: number) => {
  try {
    const { data } = await apiService.axios.get<Class>(`${BASE_URL}/${id}`);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const update = async (
  apiService: ApiService,
  id: number,
  data: UpdateData,
) => {
  try {
    const { data: clazz } = await apiService.axios.patch<Class>(BASE_URL, {
      id,
      ...data,
    });

    return clazz;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const remove = async (apiService: ApiService, id: number) => {
  try {
    const { data } = await apiService.axios.delete(`${BASE_URL}/${id}`);

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
