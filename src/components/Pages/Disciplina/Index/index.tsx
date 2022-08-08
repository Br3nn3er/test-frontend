import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageListHeader } from '@components/PageList/components/Header';
import { Wrapper } from '@components/Wrapper';

import { useDisciplineApi } from '@contexts/ApiContext';

import { DisciplineRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Discipline } from '@models/Discipline';

import { Table } from './components/Table';

const userRole = [Role.ADMIN];

const DisciplineList: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const { toast } = useToast();

  const { findAll } = useDisciplineApi();

  const onCreate = useCallback(() => {
    Router.push(DisciplineRoute.CREATE);
  }, []);

  const fetchDisciplines = useCallback(async () => {
    setLoading(true);

    try {
      setDisciplines(await findAll());
    } catch ({
      message = 'Erro ao buscar disciplinas, tente novamente mais tarde',
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
    await fetchDisciplines();
  });

  return (
    <CanAccess pageTitle="Listagem de disciplinas" userRole={userRole}>
      <Wrapper>
        <PageListHeader onCreate={onCreate} title="Disciplinas" />

        <Table
          disciplines={disciplines}
          isFetched={isFetched}
          loading={loading}
          onRefresh={fetchDisciplines}
        />
      </Wrapper>
    </CanAccess>
  );
};

export { DisciplineList };
