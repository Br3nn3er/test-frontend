import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageListHeader } from '@components/PageList/components/Header';
import { Wrapper } from '@components/Wrapper';

import { useTeacherApi } from '@contexts/ApiContext';

import { TeacherRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';

import { Table } from './components/Table';

const userRole = [Role.ADMIN];

const TeacherList: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const { toast } = useToast();

  const { findAll } = useTeacherApi();

  const onCreate = useCallback(() => {
    Router.push(TeacherRoute.CREATE);
  }, []);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);

    try {
      setTeachers(await findAll());
    } catch ({
      message = 'Erro ao buscar professores, tente novamente mais tarde',
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
    await fetchTeachers();
  });

  return (
    <CanAccess pageTitle="Listagem de professores" userRole={userRole}>
      <Wrapper>
        <PageListHeader onCreate={onCreate} title="Professores" />

        <Table
          teachers={teachers}
          isFetched={isFetched}
          loadinng={loading}
          onRefresh={fetchTeachers}
        />
      </Wrapper>
    </CanAccess>
  );
};

export { TeacherList };
