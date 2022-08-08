import { Box } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import Form from '@components/Pages/Curso/components/Form';
import { OnSubmit } from '@components/Pages/Curso/components/Form/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import { PageLoader } from '@components/PageLoader';
import { Wrapper } from '@components/Wrapper';

import { useCourseApi } from '@contexts/ApiContext';

import { CourseRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Course } from '@models/Course';

import { Params } from './types';

const userRole = [Role.ADMIN];

const EditCourse: FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [course, setCourse] = useState<Course>();
  const { toast } = useToast();
  const router = useRouter();
  const { code } = router.query as Params;

  const { findOne, update } = useCourseApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setFormLoading(true);

      try {
        const updatedCourse = await update(code, value);

        toast({
          description: `Curso "${updatedCourse.nome}" atualizado com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(CourseRoute.LIST);
      } catch ({
        message = 'Erro ao atualizar o curso, tente novamente mais tarde',
      }) {
        toast({
          description: message,
          duration: 5000,
          status: 'error',
          title: 'Erro',
        });

        setFormLoading(false);
      }
    },
    [code, toast, update],
  );

  usePageDidMount(async () => {
    setPageLoading(true);

    try {
      setCourse(await findOne(code));
    } catch ({ message = 'Erro ao buscar curso, tente novamente mais tarde' }) {
      toast({
        description: message,
        duration: 5000,
        status: 'error',
        title: 'Erro',
      });
    } finally {
      setPageLoading(false);
    }
  });

  return (
    <CanAccess
      pageTitle={`Curso ${course?.codigo} - Editar`}
      userRole={userRole}
    >
      <Wrapper>
        <Box position="relative">
          {pageLoading && (
            <Box
              bgColor="#FFF"
              height="100%"
              position="absolute"
              width="100%"
              zIndex={5}
            >
              <PageLoader containerHeight="100%" text="Buscando curso" />
            </Box>
          )}
          <PageFormHeader title={`Editar Curso ${course?.codigo}`} />

          <Form
            course={course}
            isUpdate
            loader={formLoading}
            onSubmit={onSubmit}
          />
        </Box>
      </Wrapper>
    </CanAccess>
  );
};

export { EditCourse };
