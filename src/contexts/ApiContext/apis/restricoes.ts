import { bulkCreate, deleteAll, list } from '@apis/restricoes';
import { CreateData } from '@apis/restricoes/types';

import { API, FindAll } from '@contexts/ApiContext/types';

import { Restricao } from '@models/Restricao';

export interface RestricoesApi extends FindAll<Restricao> {
  bulkCreate(data: CreateData[]): Promise<Restricao[]>;
  deleteAll(): Promise<void>;
  findAll(): Promise<Restricao[]>;
}

export const getRestricoesApi: API<RestricoesApi> = apiService => ({
  bulkCreate: data => bulkCreate(apiService, data),
  deleteAll: () => deleteAll(apiService),
  findAll: () => list(apiService),
});
