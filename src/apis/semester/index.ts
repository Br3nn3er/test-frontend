import { Semester } from '@models/Semester';

import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

const BASE_URL = '/semestres';

export const create = async (apiService: ApiService, data: CreateData) => {
  try {
    const { data: semester } = await apiService.axios.post<Semester>(
      BASE_URL,
      data,
    );

    return semester;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Semester[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findById = async (apiService: ApiService, id: number) => {
  try {
    const { data } = await apiService.axios.get<Semester>(`${BASE_URL}/${id}`);
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
    const { data: semester } = await apiService.axios.patch<Semester>(
      BASE_URL,
      {
        ...data,
        id,
      },
    );

    return semester;
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
