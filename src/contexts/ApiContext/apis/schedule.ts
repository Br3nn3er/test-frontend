import { list } from '@apis/schedule';

import { API, FindAll } from '@contexts/ApiContext/types';

import { Schedule } from '@models/Schedule';

export const getScheduleApi: API<FindAll<Schedule>> = apiService => ({
  findAll: () => list(apiService),
});
