import { Box } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import Form from '@components/Pages/Disciplina/components/Form';
import { OnSubmit } from '@components/Pages/Disciplina/components/Form/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import { PageLoader } from '@components/PageLoader';
import { Wrapper } from '@components/Wrapper';

import { useDisciplineApi } from '@contexts/ApiContext';

import { DisciplineRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Discipline } from '@models/Discipline';

import { Params } from './types';

const userRole = [Role.ADMIN];

const EditDiscipline: FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [discipline, setDiscipline] = useState<Discipline>();
  const { toast } = useToast();
  const router = useRouter();
  const { code } = router.query as Params;

  const { findOne, update } = useDisciplineApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setFormLoading(true);

      try {
        const updatedDiscipline = await update(code, value);

        toast({
          description: `Disciplina "${updatedDiscipline.nome}" atualizada com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(DisciplineRoute.LIST);
      } catch ({
        message = 'Erro ao atualizar a disciplina, tente novamente mais tarde',
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
      setDiscipline(await findOne(code));
    } catch ({
      message = 'Erro ao buscar disciplina, tente novamente mais tarde',
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
      pageTitle={`Disciplina ${discipline?.codigo} - Editar`}
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
              <PageLoader containerHeight="100%" text="Buscando disciplina" />
            </Box>
          )}
          <PageFormHeader title={`Editar Disciplina ${discipline?.codigo}`} />

          <Form
            discipline={discipline}
            isUpdate
            loader={formLoading}
            onSubmit={onSubmit}
          />
        </Box>
      </Wrapper>
    </CanAccess>
  );
};

export { EditDiscipline };
