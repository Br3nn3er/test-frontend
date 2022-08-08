import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import Form from '@components/Pages/Curso/components/Form';
import { OnSubmit } from '@components/Pages/Curso/components/Form/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import { Wrapper } from '@components/Wrapper';

import { useCourseApi } from '@contexts/ApiContext';

import { CourseRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

const userRole = [Role.ADMIN];

const CreateCourse: FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { create } = useCourseApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setLoading(true);

      try {
        const course = await create(value);

        toast({
          description: `Curso "${course.nome}" cadastrado com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(CourseRoute.LIST);
      } catch ({
        message = 'Erro ao criar curso, tente novamente mais tarde',
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
    <CanAccess pageTitle="Criar Curso" userRole={userRole}>
      <Wrapper>
        <PageFormHeader title="Criar Curso" />

        <Form loader={loading} onSubmit={onSubmit} />
      </Wrapper>
    </CanAccess>
  );
};

export { CreateCourse };
