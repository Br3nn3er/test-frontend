import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CookieServiceInstance } from '@services/index';
import CookieService from '@services/CookieService';

type ContextData = {
  cookieService?: CookieService;
};

type Props = {
  children: ReactNode;
};

const CookieContext = createContext<ContextData>({});

const CookieProvider: FC<Props> = ({ children }) => {
  const [cookieService] = useState(CookieServiceInstance);

  const value = useMemo(() => ({ cookieService }), [cookieService]);

  return (
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
};

const useCookieService = () => {
  const context = useContext(CookieContext);

  if (context === undefined) {
    throw new Error('useCookieService must be used within a CookieContext');
  }

  return context.cookieService;
};

const useToken = () => {
  const context = useContext(CookieContext);

  if (context === undefined) {
    throw new Error('useToken must be used within a CookieContext');
  }

  const { cookieService } = context;

  return {
    refreshToken: cookieService.getRefreshToken(),
    setToken: cookieService.setToken,
    token: cookieService.getToken(),
  };
};

export { CookieProvider, useCookieService, useToken };

export default CookieContext;
