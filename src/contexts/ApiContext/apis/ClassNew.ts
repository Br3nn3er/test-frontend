import {
  listByClassId,
  listByProfessorSIAPEAndSemesterId,
  listByLoggedUserAndSemesterId,
} from '@apis/ClassNew';

import { API } from '@contexts/ApiContext/types';

import { ClassNew } from '@models/ClassNew';

export interface ClassNewApi {
  findByClassId(id: number): Promise<ClassNew[]>;
  findByProfessorSIAPEAndSemesterId(
    siape: string,
    semesterId: number,
  ): Promise<ClassNew[]>;
  findByLoggedUserAndSemesterId(
    semesterId: number,
    isNotInQueue?: boolean,
  ): Promise<ClassNew[]>;
}

export const getClassNewApi: API<ClassNewApi> = apiService => ({
  findByClassId: id => listByClassId(apiService, id),
  findByProfessorSIAPEAndSemesterId: (siape, semesterId) =>
    listByProfessorSIAPEAndSemesterId(apiService, siape, semesterId),
  findByLoggedUserAndSemesterId: (semesterId, isNotInQueue) =>
    listByLoggedUserAndSemesterId(apiService, semesterId, isNotInQueue),
});
