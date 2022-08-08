import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  usePrevious,
  Spinner,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { UserRoute } from '@enums/Route';

import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
import { Switch } from '@components/Form/Switch';

import { useTeacherApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';

import { FormData, OnSubmit, Props } from './types';

const createFormSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Campo obrigatória')
    .min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

const updateFormSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
});

const Form: FC<Props> = ({ isUpdate = false, loader, onSubmit, user }) => {
  const { control, register, handleSubmit, formState, setValue, reset } =
    useForm<FormData>({
      resolver: yupResolver(isUpdate ? updateFormSchema : createFormSchema),
    });
  const { errors } = formState;
  const previousUser = usePrevious(user);
  const [professors, setProfessors] = useState<Teacher[]>([]);
  const [professorsLoading, setProfessorsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { findAll: findAllTeachers } = useTeacherApi();
  const { toast } = useToast();

  const onFormSubmit = useCallback<OnSubmit>(
    value => onSubmit(value),
    [onSubmit],
  );

  useDidMount(async () => {
    setProfessorsLoading(true);

    try {
      setProfessors(await findAllTeachers());
    } catch ({
      message = 'Erro ao buscar cursos, tente novamente mais tarde',
    }) {
      toast({
        description: message,
        duration: 5000,
        status: 'error',
        title: 'Erro',
      });
    } finally {
      setProfessorsLoading(false);
    }
  });

  useEffect(() => {
    if (!previousUser && user && user.id) {
      setValue('email', user.email);
      setValue('id', user.id);
      setValue('isAdmin', user.isAdmin);
      setValue('name', user.name);
      setValue('siape', user.siape);
      setIsAdmin(user.isAdmin);
    }
  }, [user, previousUser, setValue, reset]);

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <VStack spacing="6">
        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          {isUpdate && (
            <Input
              isDisabled
              label="ID"
              name="id"
              type="text"
              {...register('id')}
            />
          )}

          <Input
            error={errors.name}
            label="Nome"
            name="nome"
            type="text"
            {...register('name')}
          />

          <Input
            isDisabled={isUpdate}
            error={errors.email}
            label="E-mail"
            name="email"
            type="email"
            {...register('email')}
          />
        </SimpleGrid>

        {!isUpdate && (
          <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
            <Input
              error={errors.password}
              label="Senha"
              name="password"
              type="password"
              {...register('password')}
            />

            <Input
              error={errors.password_confirmation}
              label="Confirmar Senha"
              name="password_confirmation"
              type="password"
              {...register('password_confirmation')}
            />
          </SimpleGrid>
        )}

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Box alignItems="center" display="flex">
            <Switch
              control={control}
              defaultChecked={user?.isAdmin}
              isDisabled={isUpdate}
              error={errors.isAdmin}
              label="É admin?"
              name="isAdmin"
              {...register('isAdmin')}
              onChange={e => {
                setIsAdmin(e.target.checked);
                if (e.target.checked) setValue('siape', null);
              }}
            />
          </Box>

          <Box position="relative">
            <Select
              placeholder="Selecione um Professor"
              error={errors.siape}
              isDisabled={professorsLoading || isAdmin || isUpdate}
              label="Professor"
              name="siape"
              {...register('siape')}
            >
              {professors.map(professor => (
                <option
                  key={`professor-${professor.siape}`}
                  value={professor.siape}
                >
                  {professor.nome}
                </option>
              ))}
            </Select>
            {professorsLoading && (
              <Box
                bgColor="gray.100"
                bottom={1}
                position="absolute"
                right={2}
                zIndex={5}
              >
                <Spinner />
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href={UserRoute.LIST} passHref>
            <Button
              as="a"
              bgColor="gray.200"
              colorScheme="gray"
              disabled={loader}
            >
              Cancelar
            </Button>
          </Link>

          <Button
            colorScheme="blue"
            disabled={loader}
            isLoading={loader}
            type="submit"
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Form;
