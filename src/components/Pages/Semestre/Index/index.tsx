import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageListHeader } from '@components/PageList/components/Header';
import { Wrapper } from '@components/Wrapper';

import { useSemesterApi } from '@contexts/ApiContext';

import { SemesterRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Semester } from '@models/Semester';

import { Table } from './components/Table';

const userRole = [Role.ADMIN];

const SemesterList: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const { toast } = useToast();

  const { findAll } = useSemesterApi();

  const onCreate = useCallback(() => {
    Router.push(SemesterRoute.CREATE);
  }, []);

  const fetchSemesters = useCallback(async () => {
    setLoading(true);

    try {
      setSemesters(await findAll());
    } catch ({
      message = 'Erro ao buscar semestres, tente novamente mais tarde',
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
    <CanAccess pageTitle="Listagem de semestres" userRole={userRole}>
      <Wrapper>
        <PageListHeader onCreate={onCreate} title="Semestres" />

        <Table
          isFetched={isFetched}
          loadinng={loading}
          onRefresh={fetchSemesters}
          semesters={semesters}
        />
      </Wrapper>
    </CanAccess>
  );
};

export { SemesterList };
