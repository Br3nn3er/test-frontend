import { Queue } from '@models/Queue';

import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

const BASE_URL = '/fila';

export const create = async (apiService: ApiService, data: CreateData) => {
  try {
    const { data: queue } = await apiService.axios.post<Queue>(BASE_URL, data);
    return queue;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Queue[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const listByDisciplineCodeAndSemesterId = async (
  apiService: ApiService,
  disciplineCode: string,
  semesterId: number,
) => {
  try {
    const { data } = await apiService.axios.get<Queue[]>(
      `${BASE_URL}/disciplina/${disciplineCode}/semestre/${semesterId}`,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const listByTeacherSIAPEAndSemesterId = async (
  apiService: ApiService,
  siape: string,
  semesterId: number,
) => {
  try {
    const { data } = await apiService.axios.get<Queue[]>(
      `${BASE_URL}/professor/${siape}/semestre/${semesterId}`,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findById = async (apiService: ApiService, id: number) => {
  try {
    const { data } = await apiService.axios.get<Queue>(`${BASE_URL}/${id}`);
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
    const { data: queue } = await apiService.axios.patch<Queue>(BASE_URL, {
      id,
      ...data,
    });

    return queue;
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
