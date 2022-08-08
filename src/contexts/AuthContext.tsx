import Router from 'next/router';
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  FC,
} from 'react';

import { SignInCredentials } from '@apis/auth/types';

import { useApiService, useAuthApi } from '@contexts/ApiContext';
import { useCookieService } from '@contexts/CookieContext';

import { AuthRoute } from '@enums/Route';

import { User } from '@models/User';

type AuthContextData = {
  alreadyFirstFetched: boolean;
  fetchingUser: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<User>;
  signOut: () => void;
  user: User;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [alreadyFirstFetched, setAlreadyFirstFetched] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const [apiService] = useApiService();
  const cookieService = useCookieService();
  const { login, me } = useAuthApi();

  const signOut = useCallback(() => {
    cookieService.destroy();

    setAlreadyFirstFetched(false);
    setIsAuthenticated(false);
    setUser(null);

    Router.push(AuthRoute.LOGIN);
  }, [cookieService]);

  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      try {
        const {
          token,
          // eslint-disable-next-line camelcase
          refresh_token,
          user: loggedUser,
        } = await login(credentials);

        setAlreadyFirstFetched(true);

        apiService.setTokenHeader(token);
        cookieService.setToken(token, refresh_token);

        setUser(loggedUser);
        setIsAuthenticated(true);

        return loggedUser;
      } catch (e) {
        setIsAuthenticated(false);
        throw e;
      }
    },
    [apiService, cookieService, login],
  );

  useEffect(() => {
    const token = cookieService.getToken();
    if (!token) return;

    setFetchingUser(true);
    setAlreadyFirstFetched(true);

    me()
      .then(loggedUser => {
        setUser(loggedUser);
        setIsAuthenticated(true);
      })
      .catch(({ response }) => {
        if (response?.status && response?.status !== 401) signOut();
      })
      .finally(() => setFetchingUser(false));
  }, []);

  const value = useMemo(
    () => ({
      alreadyFirstFetched,
      fetchingUser,
      signIn,
      signOut,
      isAuthenticated,
      user,
    }),
    [alreadyFirstFetched, fetchingUser, isAuthenticated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useSignOut = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('signOut must be used within a AuthContext');
  }

  return context.signOut;
};

const useSignIn = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useSignIn must be used within a AuthContext');
  }

  return context.signIn;
};

const useAuthInfo = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a AuthContext');
  }

  return {
    alreadyFirstFetched: context.alreadyFirstFetched,
    fetchingUser: context.fetchingUser,
    isAuthenticated: context.isAuthenticated,
    user: context.user,
  };
};

export { AuthProvider, useAuthInfo, useSignIn, useSignOut };

export default AuthContext;
