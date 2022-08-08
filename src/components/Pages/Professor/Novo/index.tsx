import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import Form from '@components/Pages/Professor/components/Form';
import { OnSubmit } from '@components/Pages/Professor/components/Form/types';
import { Wrapper } from '@components/Wrapper';

import { useTeacherApi } from '@contexts/ApiContext';

import { TeacherRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

const userRole = [Role.ADMIN];

const CreateTeacher: FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { create } = useTeacherApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setLoading(true);

      try {
        const teacher = await create(value);

        toast({
          description: `Professor "${teacher.nome}" cadastrado com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(TeacherRoute.LIST);
      } catch ({
        message = 'Erro ao criar professor, tente novamente mais tarde',
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
    <CanAccess pageTitle="Criar Professor" userRole={userRole}>
      <Wrapper>
        <PageFormHeader title="Criar Professor" />

        <Form loader={loading} onSubmit={onSubmit} />
      </Wrapper>
    </CanAccess>
  );
};

export { CreateTeacher };
