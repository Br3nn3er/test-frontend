import { Schedule } from '@models/Schedule';

import ApiService from '@services/ApiService';

const BASE_URL = '/horarios';

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Schedule[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
