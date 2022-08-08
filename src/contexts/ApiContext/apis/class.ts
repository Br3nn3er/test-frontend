import {
  create,
  findById,
  list,
  listBySemesterId,
  remove,
  update,
} from '@apis/class';
import { CreateData, UpdateData } from '@apis/class/types';

import { API, BaseCRUD } from '@contexts/ApiContext/types';

import { Class } from '@models/Class';

export interface ClassApi
  extends BaseCRUD<Class, number, CreateData, UpdateData> {
  findBySemesterId(semesterId: number): Promise<Class[]>;
}

export const getClassApi: API<ClassApi> = apiService => ({
  create: (data: CreateData) => create(apiService, data),
  findAll: () => list(apiService),
  findBySemesterId: (id: number) => listBySemesterId(apiService, id),
  findOne: (id: number) => findById(apiService, id),
  remove: (id: number) => remove(apiService, id),
  update: (id: number, data: UpdateData) => update(apiService, id, data),
});
