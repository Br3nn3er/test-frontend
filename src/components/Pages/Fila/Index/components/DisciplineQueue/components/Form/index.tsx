import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FC, useCallback, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Select } from '@components/Form/Select2';
import { Option } from '@components/Form/Select2/types';

import { useDisciplineApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Discipline } from '@models/Discipline';

import { Fields, Props } from './types';

const formSchema = yup.object().shape({
  discipline: yup
    .object()
    .required('Campo obrigatório')
    .typeError('Campo Obrigratório'),
});

const Form: FC<Props> = ({ onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option<Discipline>[]>([]);
  const { findAll } = useDisciplineApi();
  const { toast } = useToast();

  const { register, handleSubmit, formState, setValue } = useForm<Fields>({
    resolver: yupResolver(formSchema),
  });
  const { errors } = formState;

  const onSubmit = useCallback(
    (value: Fields) => {
      onSelect(value.discipline);
    },
    [onSelect],
  );

  const onChange = useCallback(
    (discipline: Discipline) => {
      setValue('discipline', discipline);
      handleSubmit(onSubmit)();
    },
    [handleSubmit, setValue, onSubmit],
  );

  useDidMount(async () => {
    try {
      setLoading(true);
      const disciplines = await findAll();
      setOptions(disciplines.map(d => ({ value: d, label: d.nome })));
    } catch ({
      message = 'Erro ao buscar disciplinas, tente novamente mais tarde!',
    }) {
      toast({
        description: message,
        duration: 5000,
        status: 'error',
        title: 'Erro',
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(onSubmit)}
      paddingY={4}
      width="100%"
    >
      <Select
        {...register('discipline')}
        error={errors.discipline as FieldError}
        isClearable={false}
        isDisabled={loading}
        label="Digite o nome de uma disciplina"
        placeholder="Selecione uma disciplina"
        onChange={onChange}
        options={options}
      />
    </Flex>
  );
};

export { Form };
