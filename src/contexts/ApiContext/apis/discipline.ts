import { create, findById, list, remove, update } from '@apis/discipline';
import { CreateData, UpdateData } from '@apis/discipline/types';

import { BaseCRUDApi } from '@contexts/ApiContext/types';

import { Discipline } from '@models/Discipline';

export const getDisciplineApi: BaseCRUDApi<
  Discipline,
  string,
  CreateData,
  UpdateData
> = apiService => ({
  create: (data: CreateData) => create(apiService, data),
  findOne: (code: string) => findById(apiService, code),
  findAll: () => list(apiService),
  remove: (code: string) => remove(apiService, code),
  update: (code: string, data: UpdateData) => update(apiService, code, data),
});
