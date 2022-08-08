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

import { Input } from '@components/Form/Input';
import { Select } from '@components/Form/Select';
import { Switch } from '@components/Form/Switch';

import { useCourseApi } from '@contexts/ApiContext';

import { DisciplineRoute } from '@enums/Route';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Course } from '@models/Course';

import { FormData, OnSubmit, Props } from './types';

const formSchema = yup.object().shape({
  codigo: yup.string().required('Campo obrigatório'),
  cod_antigo: yup.string().nullable(),
  nome: yup.string().required('Campo obrigatório'),
  ch_teorica: yup
    .number()
    .required('Campo obrigatória')
    .typeError('Campo obrigatória'),
  ch_pratica: yup
    .number()
    .required('Campo obrigatória')
    .typeError('Campo obrigatória'),
  ch_total: yup
    .number()
    .required('Campo obrigatória')
    .typeError('Campo obrigatória'),
  curso: yup.string().required('Campo obrigatório'),
  periodo: yup
    .number()
    .required('Campo obrigatório')
    .typeError('Campo obrigatória'),
});

const Form: FC<Props> = ({
  discipline,
  isUpdate = false,
  loader,
  onSubmit,
}) => {
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const { toast } = useToast();

  const { findAll } = useCourseApi();

  const { control, register, handleSubmit, formState, setValue } =
    useForm<FormData>({
      resolver: yupResolver(formSchema),
    });
  const { errors } = formState;
  const previousDiscipline = usePrevious(discipline);
  const previousCourses = usePrevious(courses);

  const onFormSubmit = useCallback<OnSubmit>(
    value =>
      onSubmit({
        ...value,
        cod_antigo: value.cod_antigo || undefined,
      }),
    [onSubmit],
  );

  useEffect(() => {
    if (!previousDiscipline && discipline && discipline.codigo) {
      setValue('codigo', discipline.codigo);
      setValue('nome', discipline.nome);
      setValue('ch_teorica', discipline.ch_teorica);
      setValue('ch_pratica', discipline.ch_pratica);
      setValue('ch_total', discipline.ch_total);
      setValue('curso', discipline.curso);
      setValue('temfila', discipline.temfila);
      setValue('periodo', discipline.periodo);
      setValue('cod_antigo', discipline.cod_antigo);
    }
  }, [discipline, previousDiscipline, setValue]);

  useEffect(() => {
    if (!previousCourses?.length && courses.length && discipline?.codigo) {
      setValue('curso', discipline.curso);
    }
  }, [courses, discipline, previousCourses, setValue]);

  useDidMount(async () => {
    setCoursesLoading(true);

    try {
      setCourses(await findAll());
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
      setCoursesLoading(false);
    }
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <VStack spacing="6">
        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.codigo}
            isDisabled={isUpdate}
            label="Código"
            name="codigo"
            {...register('codigo')}
          />

          <Input
            error={errors.nome}
            label="Nome"
            name="nome"
            {...register('nome')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.ch_teorica}
            label="Carga Teórica"
            name="ch_teorica"
            type="number"
            {...register('ch_teorica')}
          />

          <Input
            error={errors.ch_pratica}
            label="Carga Prática"
            name="ch_pratica"
            type="number"
            {...register('ch_pratica')}
          />

          <Input
            error={errors.ch_total}
            label="Carga Total"
            name="ch_total"
            type="number"
            {...register('ch_total')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Box position="relative">
            <Select
              placeholder="Selecione um Curso"
              error={errors.curso}
              isDisabled={coursesLoading}
              label="Curso"
              name="curso"
              {...register('curso')}
            >
              {courses.map(course => (
                <option key={`curso-${course.codigo}`} value={course.codigo}>
                  {course.nome}
                </option>
              ))}
            </Select>
            {coursesLoading && (
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

          <Input
            error={errors.periodo}
            label="Período"
            name="periodo"
            type="number"
            {...register('periodo')}
          />

          <Input
            error={errors.cod_antigo}
            label="Código Antigo"
            name="cod_antigo"
            {...register('cod_antigo')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Switch
            control={control}
            defaultChecked={discipline?.temfila}
            error={errors.temfila}
            label="Tem Fila?"
            name="temfila"
            {...register('temfila')}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href={DisciplineRoute.LIST} passHref>
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
