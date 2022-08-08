import { listByClassIdAndSemesterId } from '@apis/oferta';

import { API } from '@contexts/ApiContext/types';

import { Oferta } from '@models/Oferta';

export interface OfertaApi {
  listByClassIdAndSemesterId(
    classId: number,
    semesterId: number,
  ): Promise<Oferta[]>;
}

export const getOfertaApi: API<OfertaApi> = apiService => ({
  listByClassIdAndSemesterId: (classId: number, semesterId: number) =>
    listByClassIdAndSemesterId(apiService, classId, semesterId),
});
