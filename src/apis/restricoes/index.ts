import { Restricao } from '@models/Restricao';

import ApiService from '@services/ApiService';

import { CreateData } from './types';

const BASE_URL = '/restricoes';

export const list = async (apiService: ApiService) => {
  try {
    const { data } = await apiService.axios.get<Restricao[]>(BASE_URL);
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const bulkCreate = async (
  apiService: ApiService,
  restricoes: CreateData[],
) => {
  try {
    const { data } = await apiService.axios.post<Restricao[]>(
      BASE_URL,
      restricoes,
    );
    return data;
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};

export const deleteAll = async (apiService: ApiService) => {
  try {
    await apiService.axios.delete(BASE_URL);
  } catch (e) {
    if (e.response) throw new Error(e.response.data.message);
    throw e;
  }
};
