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
import moment from 'moment';
import Link from 'next/link';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '@components/Form/Input';
import { Switch } from '@components/Form/Switch';

import { TeacherRoute } from '@enums/Route';

import { FormData, OnSubmit, Props } from './types';

const formSchema = yup.object().shape({
  siape: yup.string().required('Siape obrigatório'),
  nome: yup.string().required('Nome obrigatório'),
  data_ingresso: yup
    .date()
    .required('Data de Ingresso obrigatória')
    .typeError('Data de Ingresso obrigatória'),
  data_nasc: yup
    .date()
    .required('Data de Nascimento obrigatória')
    .typeError('Data de Nascimento obrigatória'),
  afastado: yup.boolean(),
  regime: yup.string().required('Regime obrigatório'),
  carga_atual: yup
    .number()
    .required('Carga atual obrigatória')
    .typeError('Carga atual obrigatória'),
  locacao: yup.string().required('Locação obrigatória'),
  data_saida: yup.date(),
  data_exoneracao: yup.date(),
  data_aposentadoria: yup.date(),
  cnome: yup.string().required('CNome obrigatório'),
  status: yup.string().required('Status obrigatório'),
});

const Form: FC<Props> = ({ isUpdate = false, loader, onSubmit, teacher }) => {
  const { control, register, handleSubmit, formState, setValue, reset } =
    useForm<FormData>({
      resolver: yupResolver(formSchema),
    });
  const { errors } = formState;
  const previousTeacher = usePrevious(teacher);

  const onFormSubmit = useCallback<OnSubmit>(
    value =>
      onSubmit({
        ...value,
      }),
    [onSubmit],
  );

  useEffect(() => {
    if (!previousTeacher && teacher && teacher.siape) {
      setValue('siape', teacher.siape);
      setValue('nome', teacher.nome);
      setValue('afastado', teacher.afastado);
      setValue('carga_atual', teacher.carga_atual);
      setValue('cnome', teacher.cnome);
      setValue(
        'data_aposentadoria',
        teacher.data_aposentadoria
          ? moment(teacher.data_aposentadoria).format('YYYY-MM-DD')
          : undefined,
      );
      setValue(
        'data_exoneracao',
        teacher.data_exoneracao
          ? moment(teacher.data_exoneracao).format('YYYY-MM-DD')
          : undefined,
      );
      setValue(
        'data_ingresso',
        teacher.data_ingresso
          ? moment(teacher.data_ingresso).format('YYYY-MM-DD')
          : undefined,
      );
      setValue(
        'data_nasc',
        teacher.data_nasc
          ? moment(teacher.data_nasc).format('YYYY-MM-DD')
          : undefined,
      );
      setValue(
        'data_saida',
        teacher.data_saida
          ? moment(teacher.data_saida).format('YYYY-MM-DD')
          : undefined,
      );
      setValue('locacao', teacher.locacao);
      setValue('regime', teacher.regime);
      setValue('status', teacher.status);
    }
  }, [teacher, previousTeacher, setValue, reset]);

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <VStack spacing="6">
        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.siape}
            isDisabled={isUpdate}
            label="Siape"
            name="siape"
            {...register('siape')}
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
            error={errors.regime}
            label="Regime"
            name="regime"
            {...register('regime')}
          />

          <Input
            defaultValue="0"
            error={errors.carga_atual}
            label="Carga Atual"
            name="carga_atual"
            type="number"
            {...register('carga_atual')}
          />

          <Input
            error={errors.cnome}
            label="CNome"
            name="cnome"
            {...register('cnome')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.status}
            label="Status"
            name="status"
            {...register('status')}
          />

          <Input
            error={errors.locacao}
            label="Locação"
            name="locacao"
            {...register('locacao')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.data_nasc}
            label="Data de Nascimento"
            name="data_nasc"
            type="date"
            {...register('data_nasc')}
          />

          <Input
            error={errors.data_ingresso}
            label="Data Ingresso"
            name="data_ingresso"
            type="date"
            {...register('data_ingresso')}
          />

          <Input
            error={errors.data_aposentadoria}
            label="Data de Aposentadoria"
            name="data_aposentadoria"
            type="date"
            {...register('data_aposentadoria')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Input
            error={errors.data_exoneracao}
            label="Data de Exoneração"
            name="data_exoneracao"
            type="date"
            {...register('data_exoneracao')}
          />

          <Input
            error={errors.data_saida}
            label="Data de Saída"
            name="data_saida"
            type="date"
            {...register('data_saida')}
          />
        </SimpleGrid>

        <SimpleGrid minChildWidth="240px" spacing="6" w="100%">
          <Switch
            control={control}
            defaultChecked={teacher?.afastado}
            error={errors.afastado}
            label="Afastado?"
            name="afastado"
            {...register('afastado')}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href={TeacherRoute.LIST} passHref>
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
