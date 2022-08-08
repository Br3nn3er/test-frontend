import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CreateData } from '@apis/user/types';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageFormHeader } from '@components/PageForm/components/Header';
import Form from '@components/Pages/Usuario/components/Form';
import { OnSubmit } from '@components/Pages/Usuario/components/Form/types';
import { Wrapper } from '@components/Wrapper';

import { useUserApi } from '@contexts/ApiContext';

import { UserRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

const userRole = [Role.ADMIN];

const CreateUser: FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { create } = useUserApi();
  const onSubmit = useCallback<OnSubmit>(
    async value => {
      setLoading(true);

      try {
        const user = await create(value as CreateData);

        toast({
          description: `Usuário "${user.id}" cadastrado com sucesso`,
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });

        Router.push(UserRoute.LIST);
      } catch ({
        message = 'Erro ao criar usuário, tente novamente mais tarde',
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
    <CanAccess pageTitle="Criar Usuário" userRole={userRole}>
      <Wrapper>
        <PageFormHeader title="Criar Usuário" />

        <Form loader={loading} onSubmit={onSubmit} />
      </Wrapper>
    </CanAccess>
  );
};

export { CreateUser };
