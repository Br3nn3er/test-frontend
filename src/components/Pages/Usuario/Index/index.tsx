import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageListHeader } from '@components/PageList/components/Header';
import { Wrapper } from '@components/Wrapper';

import { useUserApi } from '@contexts/ApiContext';

import { UserRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { User } from '@models/User';

import { Table } from './components/Table';

const userRole = [Role.ADMIN];

const UsersList: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  const { findAll } = useUserApi();

  const onCreate = useCallback(() => {
    Router.push(UserRoute.CREATE);
  }, []);

  const fetchSemesters = useCallback(async () => {
    setLoading(true);

    try {
      setUsers(await findAll());
    } catch ({
      message = 'Erro ao buscar usuários, tente novamente mais tarde',
    }) {
      toast({
        description: message,
        duration: 5000,
        status: 'error',
        title: 'Erro',
      });
    } finally {
      setLoading(false);
      setIsFetched(true);
    }
  }, [findAll, toast]);

  usePageDidMount(async () => {
    await fetchSemesters();
  });

  return (
    <CanAccess pageTitle="Listagem de usuários" userRole={userRole}>
      <Wrapper>
        <PageListHeader onCreate={onCreate} title="Usuários" />

        <Table
          isFetched={isFetched}
          loadinng={loading}
          onRefresh={fetchSemesters}
          users={users}
        />
      </Wrapper>
    </CanAccess>
  );
};

export { UsersList };
