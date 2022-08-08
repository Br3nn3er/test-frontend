import Router from 'next/router';
import { FC, useEffect } from 'react';

import { LoggedPage } from '@components/LoggedPage';
import { PageLoader } from '@components/PageLoader';

import { useAuthInfo, useSignOut } from '@contexts/AuthContext';
import { useToken } from '@contexts/CookieContext';

import { AuthRoute } from '@enums/Route';

import { useAdminPermission } from '@hooks/useAdminPermission';

import { Props, Role } from './types';

const CanAccess: FC<Props> = ({ children, pageTitle, userRole = [] }) => {
  const isAdmin = useAdminPermission({
    isAdmin: userRole.includes(Role.ADMIN),
  });
  const userCanAccessComponent = userRole.length ? isAdmin : true;
  const { alreadyFirstFetched, fetchingUser } = useAuthInfo();
  const { token } = useToken();
  const signOut = useSignOut();

  useEffect(() => {
    if (!token) Router.push(AuthRoute.LOGIN);
  }, [token]);

  useEffect(() => {
    if (alreadyFirstFetched && !fetchingUser && !userCanAccessComponent) {
      signOut();
    }
  }, [alreadyFirstFetched, fetchingUser, signOut, userCanAccessComponent]);

  if (fetchingUser || !alreadyFirstFetched) {
    return (
      <LoggedPage pageTitle={pageTitle} showHeader={false} showSideBar={false}>
        <PageLoader />
      </LoggedPage>
    );
  }

  return <LoggedPage pageTitle={pageTitle}>{children}</LoggedPage>;
};

export { CanAccess };
