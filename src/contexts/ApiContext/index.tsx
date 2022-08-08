import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ApiServiceInstance } from '@services/index';
import ApiService from '@services/ApiService';

import { getAuthApi } from './apis/auth';
import { getClassApi } from './apis/class';
import { getClassNewApi } from './apis/ClassNew';
import { getCourseApi } from './apis/course';
import { getDisciplineApi } from './apis/discipline';
import { getQueueApi } from './apis/queue';
import { getScheduleApi } from './apis/schedule';
import { getSemesterApi } from './apis/semester';
import { getTeacherApi } from './apis/teacher';
import { getUserApi } from './apis/user';
import { getOfertaApi } from './apis/oferta';
import { getMinistraApi } from './apis/ministra';
import { getRestricoesApi } from './apis/restricoes';

type ContextData = {
  useApiService?: () => ApiService;
};

type Props = {
  children: ReactNode;
};

const ApiContext = createContext<ContextData>({});

const ApiProvider: FC<Props> = ({ children }) => {
  const [apiService] = useState(ApiServiceInstance);

  const useApiService = useCallback(() => apiService, [apiService]);

  const value = useMemo(() => ({ useApiService }), []);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

const useApiService = () => {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error('useApiService must be used within a ApiContext');
  }

  return [context.useApiService()];
};

const useAuthApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useAuthApi must be used within a ApiContext');
  }

  return getAuthApi(apiService);
};

const useCourseApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useCourseApi must be used within a ApiContext');
  }

  return getCourseApi(apiService);
};

const useDisciplineApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useDisciplineApi must be used within a ApiContext');
  }

  return getDisciplineApi(apiService);
};

const useTeacherApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useTeacherApi must be used within a ApiContext');
  }

  return getTeacherApi(apiService);
};

const useSemesterApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useSemesterApi must be used within a ApiContext');
  }

  return getSemesterApi(apiService);
};

const useUserApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useUserApi must be used within a ApiContext');
  }

  return getUserApi(apiService);
};

const useQueueApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useQueueApi must be used within a ApiContext');
  }

  return getQueueApi(apiService);
};

const useClassApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useClassApi must be used within a ApiContext');
  }

  return getClassApi(apiService);
};

const useClassNewApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useClassNewApi must be used within a ApiContext');
  }

  return getClassNewApi(apiService);
};

const useScheduleApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useSchedulepi must be used within a ApiContext');
  }

  return getScheduleApi(apiService);
};

const useOfertaApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useOfertaApi must be used within a ApiContext');
  }

  return getOfertaApi(apiService);
};

const useMinistraApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useMinistraApi must be used within a ApiContext');
  }

  return getMinistraApi(apiService);
};

const useRestricoesApi = () => {
  const context = useContext(ApiContext);
  const apiService = context.useApiService();

  if (context === undefined) {
    throw new Error('useRestricoesApi must be used within a ApiContext');
  }

  return getRestricoesApi(apiService);
};

export {
  ApiProvider,
  useApiService,
  useAuthApi,
  useClassApi,
  useClassNewApi,
  useCourseApi,
  useDisciplineApi,
  useQueueApi,
  useSemesterApi,
  useTeacherApi,
  useUserApi,
  useScheduleApi,
  useOfertaApi,
  useMinistraApi,
  useRestricoesApi,
};

export default ApiContext;
