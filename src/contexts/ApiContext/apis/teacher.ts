import { create, findBySiape, list, remove, update } from '@apis/teacher';
import { CreateData, UpdateData } from '@apis/teacher/types';

import { BaseCRUDApi } from '@contexts/ApiContext/types';

import { Teacher } from '@models/Teacher';

export const getTeacherApi: BaseCRUDApi<
  Teacher,
  string,
  CreateData,
  UpdateData
> = apiService => ({
  create: (data: CreateData) => create(apiService, data),
  findAll: () => list(apiService),
  findOne: (siape: string) => findBySiape(apiService, siape),
  remove: (siape: string) => remove(apiService, siape),
  update: (siape: string, data: UpdateData) => update(apiService, siape, data),
});
