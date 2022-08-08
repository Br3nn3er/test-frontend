import { Ministra } from '@models/Ministra';

import ApiService from '@services/ApiService';

const BASE_URL = '/ministra';

export const listByProfessorAndSemester = async (
  apiService: ApiService,
  semesterId: number,
  siapes: string[] = [],
) => {
  try {
    const { data } = await apiService.axios.get<Ministra[]>(
      `${BASE_URL}/professor/semestre/${semesterId}`,
      { params: { siapes } },
    );

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const listByLoggedUserAndClassAndSemester = async (
  apiService: ApiService,
  semesterId: number,
  classId: number[] = [],
) => {
  try {
    const { data } = await apiService.axios.get<Ministra[]>(
      `${BASE_URL}/turma/semestre/${semesterId}`,
      { params: { turmas: classId } },
    );

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
