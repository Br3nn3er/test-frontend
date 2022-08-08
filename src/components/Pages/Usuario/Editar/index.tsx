import { Box } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import Form from '@components/Pages/Usuario/components/Form';
import { OnSubmit } from '@components/Pages/Usuario/components/Form/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import { PageLoader } from '@components/PageLoader';
import { Wrapper } from '@components/Wrapper';

import { useUserApi } from '@contexts/ApiContext';

import { UserRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { User } from '@models/User';

import { Params } from './types';

const userRole = [Role.ADMIN];

const EditUser: FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const { toast } = useToast();
  const router = useRouter();
  const { id } = router.query as Params;

  const { findOne, update } = useUserApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setFormLoading(true);

      try {
        await update(id, value);

        toast({
          description: `Usuário "${id}" atualizada com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(UserRoute.LIST);
      } catch ({
        message = 'Erro ao atualizar o usuário, tente novamente mais tarde',
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
      setUser(await findOne(id));
    } catch ({
      message = 'Erro ao buscar usuário, tente novamente mais tarde',
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
    <CanAccess pageTitle={`Usuário ${user?.id} - Editar`} userRole={userRole}>
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
              <PageLoader containerHeight="100%" text="Buscando usuário" />
            </Box>
          )}
          <PageFormHeader title={`Editar Usuário ${user?.id}`} />

          <Form isUpdate loader={formLoading} onSubmit={onSubmit} user={user} />
        </Box>
      </Wrapper>
    </CanAccess>
  );
};

export { EditUser };
