import { Oferta } from '@models/Oferta';

import ApiService from '@services/ApiService';

const BASE_URL = '/oferta';

export const listByClassIdAndSemesterId = async (
  apiService: ApiService,
  classId: number,
  semesterId: number,
) => {
  try {
    const { data } = await apiService.axios.get<Oferta[]>(
      `${BASE_URL}/turma/${classId}/semestre/${semesterId}`,
    );

    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
