import Router from 'next/router';
import { FC, memo, useEffect } from 'react';

import { PageLoader } from '@components/PageLoader';

import { useAuthInfo } from '@contexts/AuthContext';

import { AuthRoute, CourseRoute, QueueRoute } from '@enums/Route';

const Index: FC = () => {
  const { fetchingUser, isAuthenticated, user } = useAuthInfo();

  useEffect(() => {
    if (!fetchingUser && !isAuthenticated) Router.push(AuthRoute.LOGIN);

    if (!fetchingUser && isAuthenticated) {
      if (user.isAdmin) Router.push(CourseRoute.LIST);
      else Router.push(QueueRoute.INDEX);
    }
  }, [fetchingUser, isAuthenticated, user]);

  return <PageLoader />;
};

export default memo(Index);
