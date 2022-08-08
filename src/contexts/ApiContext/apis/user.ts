import { create, findById, list, remove, update } from '@apis/user';
import { CreateData, UpdateData } from '@apis/user/types';

import { BaseCRUDApi } from '@contexts/ApiContext/types';

import { User } from '@models/User';

export const getUserApi: BaseCRUDApi<User, string, CreateData, UpdateData> =
  apiService => ({
    create: (data: CreateData) => create(apiService, data),
    findAll: () => list(apiService),
    findOne: (id: string) => findById(apiService, id),
    remove: (id: string) => remove(apiService, id),
    update: (id: string, data: UpdateData) => update(apiService, id, data),
  });
