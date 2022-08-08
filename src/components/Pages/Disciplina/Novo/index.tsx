import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import Form from '@components/Pages/Disciplina/components/Form';
import { OnSubmit } from '@components/Pages/Disciplina/components/Form/types';
import { Wrapper } from '@components/Wrapper';

import { useDisciplineApi } from '@contexts/ApiContext';

import { DisciplineRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

const userRole = [Role.ADMIN];

const CreateDiscipline: FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { create } = useDisciplineApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setLoading(true);

      try {
        const discipline = await create(value);

        toast({
          description: `Disciplina "${discipline.nome}" cadastrado com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(DisciplineRoute.LIST);
      } catch ({
        message = 'Erro ao criar disciplina, tente novamente mais tarde',
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
    <CanAccess pageTitle="Criar Disciplina" userRole={userRole}>
      <Wrapper>
        <PageFormHeader title="Criar Disciplina" />

        <Form loader={loading} onSubmit={onSubmit} />
      </Wrapper>
    </CanAccess>
  );
};

export { CreateDiscipline };
