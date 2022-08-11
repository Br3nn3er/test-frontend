import { Button, Center, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Router from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/Form/Input';

import { useSignIn } from '@contexts/AuthContext';

import { CourseRoute, QueueRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export interface Fields {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [loading, setLoadding] = useState(false);
  const { toast } = useToast();
  const signIn = useSignIn();

  const { register, handleSubmit, formState } = useForm<Fields>({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const login = useCallback(
    async (value: Fields) => {
      try {
        setLoadding(true);
        const user = await signIn(value);

        if (user.isAdmin) Router.push(CourseRoute.LIST);
        else Router.push(QueueRoute.INDEX);
      } catch ({
        message = 'Erro ao fazer login, tente novamente mais tarde!',
      }) {
        toast({
          description: message,
          duration: 5000,
          status: 'error',
          title: 'Erro',
        });

        setLoadding(false);
      }
    },
    [signIn, toast],
  );

  return (
    <Flex
      alignItems="center"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <Flex
        as="form"
        background="#FFFFFF"
        borderRadius={8}
        flexDir="column"
        maxWidth={420}
        onSubmit={handleSubmit(login)}
        padding="8"
        width="100%"
      >
        <Stack spacing="4">
          <Center width="100%">
            <Text
              fontSize={22}
              fontWeight="medium"
              letterSpacing="tight"
              alignItems="center"
              mt="2"
              mb="4"
            >
              Universidade Federal de Uberlândia
            </Text>
          </Center>

          <Input
            type="email"
            name="signin_email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />

          <Input
            type="password"
            name="signin_password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          colorScheme="blue"
          disabled={loading}
          isLoading={formState.isSubmitting}
          marginTop="10"
          size="lg"
          type="submit"
        >
          {loading ? <Spinner /> : 'Entrar'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
