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

import { CourseRoute } from '@enums/Route';

import { FormData, OnSubmit, Props } from './types';

const createCursoFormSchema = yup.object().shape({
  campus: yup.string().required('Campus obrigatório'),
  code: yup.string().required('Código obrigatório'),
  name: yup.string().required('Nome obrigatório'),
  periodClash: yup.boolean(),
  timeClash: yup.boolean(),
  unit: yup.string().required('Unidade obrigatória'),
});

const Form: FC<Props> = ({ course, isUpdate = false, loader, onSubmit }) => {
  const { control, register, handleSubmit, formState, setValue } =
    useForm<FormData>({
      resolver: yupResolver(createCursoFormSchema),
    });
  const { errors } = formState;

  const formSubmit = useCallback<OnSubmit>(
    value => {
      onSubmit({
        campus: value.campus.trim(),
        code: value.code.trim(),
        name: value.name.trim(),
        periodClash: value.periodClash,
        timeClash: value.timeClash,
        unit: value.unit.trim(),
      });
    },
    [onSubmit],
  );

  const previousCourse = usePrevious(course);

  useEffect(() => {
    if (!previousCourse && course && course.codigo) {
      setValue('campus', course.campus);
      setValue('code', course.codigo);
      setValue('name', course.nome);
      setValue('periodClash', course.permitir_choque_periodo);
      setValue('timeClash', course.permitir_choque_horario);
      setValue('unit', course.unidade);
    }
  }, [course, previousCourse, setValue]);

  return (
    <Box as="form" onSubmit={handleSubmit(formSubmit)}>
      <VStack spacing="6">
        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.code}
            isDisabled={isUpdate}
            label="Código"
            name="codigo"
            {...register('code')}
          />

          <Input
            error={errors.name}
            label="Nome"
            name="nome"
            {...register('name')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.unit}
            label="Unidade"
            name="unidade"
            {...register('unit')}
          />

          <Input
            error={errors.campus}
            label="Campus"
            name="campus"
            {...register('campus')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Switch
            control={control}
            defaultChecked={false}
            error={errors.timeClash}
            label="Permitir Choque Horário?"
            name="temfila"
            {...register('timeClash')}
          />

          <Switch
            control={control}
            defaultChecked={false}
            error={errors.periodClash}
            label="Permitir Choque Período?"
            name="periodClash"
            {...register('periodClash')}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href={CourseRoute.LIST} passHref>
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
