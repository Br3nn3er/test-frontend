import {
  Box,
  Flex,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  usePrevious,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Link from 'next/link';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/Form/Input';
import { Switch } from '@components/Form/Switch';

import { SemesterRoute } from '@enums/Route';

import { FormData, OnSubmit, Props } from './types';

const formSchema = yup.object().shape({
  ano: yup.number().required('Campo Obrigatório'),
  id: yup.number(),
  semestre: yup.number().required('Campo Obrigatório'),
  status: yup.boolean().required('Campo Obrigatório').default(false),
});

const Form: FC<Props> = ({ isUpdate = false, loader, onSubmit, semester }) => {
  const { control, register, handleSubmit, formState, setValue, reset } =
    useForm<FormData>({
      resolver: yupResolver(formSchema),
    });
  const { errors } = formState;
  const previousSemester = usePrevious(semester);

  const onFormSubmit = useCallback<OnSubmit>(
    value =>
      onSubmit({
        ...value,
      }),
    [onSubmit],
  );

  useEffect(() => {
    if (!previousSemester && semester && semester.id) {
      setValue('ano', semester.ano);
      setValue('id', semester.id);
      setValue('semestre', semester.semestre);
      setValue('status', semester.status);
    }
  }, [semester, previousSemester, setValue, reset]);

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <VStack spacing="6">
        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          {isUpdate && (
            <Input
              isDisabled
              label="ID"
              name="id"
              type="number"
              {...register('id')}
            />
          )}

          <Input
            error={errors.ano}
            label="Ano"
            name="ano"
            type="number"
            {...register('ano')}
          />

          <Input
            error={errors.semestre}
            label="Semestre"
            name="semestre"
            type="number"
            {...register('semestre')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Switch
            control={control}
            defaultChecked={semester?.status}
            error={errors.status}
            label="Ativo?"
            name="status"
            {...register('status')}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href={SemesterRoute.LIST} passHref>
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
