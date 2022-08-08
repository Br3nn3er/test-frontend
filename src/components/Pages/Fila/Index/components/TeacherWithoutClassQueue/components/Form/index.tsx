import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FC, useCallback, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Select } from '@components/Form/Select2';
import { Option } from '@components/Form/Select2/types';

import { useTeacherApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';

import { Fields, Props } from './types';

const formSchema = yup.object().shape({
  teacher: yup
    .object()
    .required('Campo obrigatório')
    .typeError('Campo Obrigratório'),
});

const Form: FC<Props> = ({ onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option<Teacher>[]>([]);
  const { findAll } = useTeacherApi();
  const { toast } = useToast();

  const { register, handleSubmit, formState, setValue } = useForm<Fields>({
    resolver: yupResolver(formSchema),
  });
  const { errors } = formState;

  const onSubmit = useCallback(
    (value: Fields) => {
      onSelect(value.teacher);
    },
    [onSelect],
  );

  const onChange = useCallback(
    (teacher: Teacher) => {
      setValue('teacher', teacher);
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
      message = 'Erro ao buscar os professores, tente novamente mais tarde!',
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
        {...register('teacher')}
        error={errors.teacher as FieldError}
        isClearable={false}
        isDisabled={loading}
        label="Digite o nome de um professor"
        placeholder="Selecione um professor"
        onChange={onChange}
        options={options}
      />
    </Flex>
  );
};

export { Form };
