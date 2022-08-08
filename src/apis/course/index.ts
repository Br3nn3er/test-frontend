import { Course } from '@models/Course';
import ApiService from '@services/ApiService';

import { CreateData, UpdateData } from './types';

export const create = async (
  apiService: ApiService,
  { campus, code, name, periodClash, timeClash, unit }: CreateData,
) => {
  try {
    const { data } = await apiService.axios.post<Course>('/cursos', {
      nome: name,
      codigo: code,
      unidade: unit,
      campus,
      permitir_choque_periodo: periodClash,
      permitir_choque_horario: timeClash,
    });

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Course[]>('/cursos');
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const findById = async (apiService: ApiService, code: string) => {
  try {
    const { data } = await apiService.axios.get<Course>(`/cursos/${code}`);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const update = async (
  apiService: ApiService,
  code: string,
  { campus, name, periodClash, timeClash, unit }: UpdateData,
) => {
  try {
    const { data } = await apiService.axios.patch<Course>('/cursos', {
      codigo: code,
      nome: name,
      unidade: unit,
      campus,
      permitir_choque_periodo: periodClash,
      permitir_choque_horario: timeClash,
    });

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const remove = async (apiService: ApiService, code: string) => {
  try {
    const { data } = await apiService.axios.delete(`/cursos/${code}`);

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
