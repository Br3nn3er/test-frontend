import { create, findById, list, remove, update } from '@apis/semester';
import { CreateData, UpdateData } from '@apis/semester/types';

import { BaseCRUDApi } from '@contexts/ApiContext/types';

import { Semester } from '@models/Semester';

export const getSemesterApi: BaseCRUDApi<
  Semester,
  number,
  CreateData,
  UpdateData
> = apiService => ({
  create: (data: CreateData) => create(apiService, data),
  findAll: () => list(apiService),
  findOne: (id: number) => findById(apiService, id),
  remove: (id: number) => remove(apiService, id),
  update: (id: number, data: UpdateData) => update(apiService, id, data),
});
