import {
  listByProfessorAndSemester,
  listByLoggedUserAndClassAndSemester,
} from '@apis/ministra';

import { API } from '@contexts/ApiContext/types';
import { Ministra } from '@models/Ministra';

export interface MinistraApi {
  findByProfessorAndSemester(
    siapes: string[],
    semesterId: number,
  ): Promise<Ministra[]>;
  findByLoggedUserAndClassAndSemester(
    classIds: number[],
    semesterId: number,
  ): Promise<Ministra[]>;
}

export const getMinistraApi: API<MinistraApi> = apiService => ({
  findByProfessorAndSemester: (siapes, semesterId) =>
    listByProfessorAndSemester(apiService, semesterId, siapes),
  findByLoggedUserAndClassAndSemester: (classIds, semesterId) =>
    listByLoggedUserAndClassAndSemester(apiService, semesterId, classIds),
});
