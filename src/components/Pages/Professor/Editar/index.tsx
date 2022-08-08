import { Box } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import Form from '@components/Pages/Professor/components/Form';
import { OnSubmit } from '@components/Pages/Professor/components/Form/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import { PageLoader } from '@components/PageLoader';
import { Wrapper } from '@components/Wrapper';

import { useTeacherApi } from '@contexts/ApiContext';

import { TeacherRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';

import { Params } from './types';

const userRole = [Role.ADMIN];

const EditTeacher: FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher>();
  const { toast } = useToast();
  const router = useRouter();
  const { siape } = router.query as Params;

  const { findOne, update } = useTeacherApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setFormLoading(true);

      try {
        const updatedTeacher = await update(siape, value);

        toast({
          description: `Professor "${updatedTeacher.nome}" atualizada com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(TeacherRoute.LIST);
      } catch ({
        message = 'Erro ao atualizar o professor, tente novamente mais tarde',
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
    [siape, toast, update],
  );

  usePageDidMount(async () => {
    setPageLoading(true);

    try {
      setTeacher(await findOne(siape));
    } catch ({
      message = 'Erro ao buscar professor, tente novamente mais tarde',
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
      pageTitle={`Professor ${teacher?.siape} - Editar`}
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
              <PageLoader containerHeight="100%" text="Buscando professor" />
            </Box>
          )}
          <PageFormHeader title={`Editar Professor ${teacher?.siape}`} />

          <Form
            isUpdate
            loader={formLoading}
            onSubmit={onSubmit}
            teacher={teacher}
          />
        </Box>
      </Wrapper>
    </CanAccess>
  );
};

export { EditTeacher };
