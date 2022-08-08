import { ClassNew } from '@models/ClassNew';

import ApiService from '@services/ApiService';

const BASE_URL = '/fila_new';

export const listByClassId = async (apiService: ApiService, id: number) => {
  try {
    const { data } = await apiService.axios.get<ClassNew[]>(
      `${BASE_URL}/turma/${id}`,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const listByProfessorSIAPEAndSemesterId = async (
  apiService: ApiService,
  siape: string,
  semesterId: number,
) => {
  try {
    const { data } = await apiService.axios.get<ClassNew[]>(
      `${BASE_URL}/professor/${siape}/semestre/${semesterId}`,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const listByLoggedUserAndSemesterId = async (
  apiService: ApiService,
  semesterId: number,
  isNotInQueue = false,
) => {
  try {
    const { data } = await apiService.axios.get<ClassNew[]>(
      `${BASE_URL}/professor/semestre/${semesterId}`,
      { params: { isNotInQueue } },
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
