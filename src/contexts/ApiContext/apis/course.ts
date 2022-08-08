import { create, findById, list, remove, update } from '@apis/course';
import { CreateData, UpdateData } from '@apis/course/types';

import { BaseCRUDApi } from '@contexts/ApiContext/types';

import { Course } from '@models/Course';

export const getCourseApi: BaseCRUDApi<Course, string, CreateData, UpdateData> =
  apiService => ({
    create: (data: CreateData) => create(apiService, data),
    findOne: (code: string) => findById(apiService, code),
    findAll: () => list(apiService),
    remove: (code: string) => remove(apiService, code),
    update: (code: string, data: UpdateData) => update(apiService, code, data),
  });
