import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import Form from '@components/Pages/Semestre/components/Form';
import { OnSubmit } from '@components/Pages/Semestre/components/Form/types';
import { Wrapper } from '@components/Wrapper';

import { useSemesterApi } from '@contexts/ApiContext';

import { SemesterRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

const userRole = [Role.ADMIN];

const CreateSemester: FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { create } = useSemesterApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setLoading(true);

      try {
        const semester = await create(value);

        toast({
          description: `Semestre "${semester.id}" cadastrado com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(SemesterRoute.LIST);
      } catch ({
        message = 'Erro ao criar semestre, tente novamente mais tarde',
      }) {
        toast({
          description: message,
          duration: 5000,
          status: 'error',
          title: 'Erro',
        });

        setLoading(false);
      }
    },
    [create, toast],
  );

  return (
    <CanAccess pageTitle="Criar Semestre" userRole={userRole}>
      <Wrapper>
        <PageFormHeader title="Criar Semestre" />

        <Form loader={loading} onSubmit={onSubmit} />
      </Wrapper>
    </CanAccess>
  );
};

export { CreateSemester };
