import {
  create,
  findById,
  list,
  listByDisciplineCodeAndSemesterId,
  listByTeacherSIAPEAndSemesterId,
  remove,
  update,
} from '@apis/queue';
import { CreateData, UpdateData } from '@apis/queue/types';

import { API, BaseCRUD } from '@contexts/ApiContext/types';

import { Queue } from '@models/Queue';

export interface QueueApi
  extends BaseCRUD<Queue, number, CreateData, UpdateData> {
  findByDisciplineCodeAndSemesterId(
    disciplineCode: string,
    semesterId: number,
  ): Promise<Queue[]>;
  findByTeacherSIAPEAndSemesterId(
    siape: string,
    semesterId: number,
  ): Promise<Queue[]>;
}

export const getQueueApi: API<QueueApi> = apiService => ({
  create: (data: CreateData) => create(apiService, data),
  findAll: () => list(apiService),
  findByDisciplineCodeAndSemesterId: (
    disciplineCode: string,
    semesterId: number,
  ) =>
    listByDisciplineCodeAndSemesterId(apiService, disciplineCode, semesterId),
  findByTeacherSIAPEAndSemesterId: (siape: string, semesterId: number) =>
    listByTeacherSIAPEAndSemesterId(apiService, siape, semesterId),
  findOne: (id: number) => findById(apiService, id),
  remove: (id: number) => remove(apiService, id),
  update: (id: number, data: UpdateData) => update(apiService, id, data),
});
