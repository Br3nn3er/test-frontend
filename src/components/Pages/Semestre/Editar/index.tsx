import { Box } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import Form from '@components/Pages/Semestre/components/Form';
import { OnSubmit } from '@components/Pages/Semestre/components/Form/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import { PageLoader } from '@components/PageLoader';
import { Wrapper } from '@components/Wrapper';

import { useSemesterApi } from '@contexts/ApiContext';

import { SemesterRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Semester } from '@models/Semester';

import { Params } from './types';

const userRole = [Role.ADMIN];

const EditSemester: FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [semester, setSemester] = useState<Semester>();
  const { toast } = useToast();
  const router = useRouter();
  const id = parseInt((router.query as Params).id, 10);

  const { findOne, update } = useSemesterApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setFormLoading(true);

      try {
        const updatedSemester = await update(id, value);

        toast({
          description: `Semestre "${updatedSemester.id}" atualizada com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(SemesterRoute.LIST);
      } catch ({
        message = 'Erro ao atualizar o semestre, tente novamente mais tarde',
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
    [id, toast, update],
  );

  usePageDidMount(async () => {
    setPageLoading(true);

    try {
      setSemester(await findOne(id));
    } catch ({
      message = 'Erro ao buscar semestre, tente novamente mais tarde',
    }) {
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
      pageTitle={`Semestre ${semester?.id} - Editar`}
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
              <PageLoader containerHeight="100%" text="Buscando semestre" />
            </Box>
          )}
          <PageFormHeader title={`Editar Semestre ${semester?.id}`} />

          <Form
            isUpdate
            loader={formLoading}
            onSubmit={onSubmit}
            semester={semester}
          />
        </Box>
      </Wrapper>
    </CanAccess>
  );
};

export { EditSemester };
