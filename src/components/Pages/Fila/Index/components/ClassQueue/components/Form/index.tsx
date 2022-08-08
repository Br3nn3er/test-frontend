import { Flex, usePrevious } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FC, useCallback, useEffect, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Select } from '@components/Form/Select2';
import { Option } from '@components/Form/Select2/types';

import { useClassApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Class } from '@models/Class';
import { Semester } from '@models/Semester';

import { Fields, Props } from './types';

const formSchema = yup.object().shape({
  clazz: yup
    .object()
    .required('Campo obrigatório')
    .typeError('Campo Obrigratório'),
});

const Form: FC<Props> = ({ onSelect, semester }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option<Class>[]>([]);
  const { findBySemesterId } = useClassApi();
  const { toast } = useToast();

  const previousSemester = usePrevious(semester);

  const { register, handleSubmit, formState, setValue } = useForm<Fields>({
    resolver: yupResolver(formSchema),
  });
  const { errors } = formState;

  const onSubmit = useCallback(
    (value: Fields) => onSelect(value.clazz),
    [onSelect],
  );

  const onChange = useCallback(
    (clazz: Class) => {
      setValue('clazz', clazz);
      handleSubmit(onSubmit)();
    },
    [handleSubmit, setValue, onSubmit],
  );

  const findClasses = useCallback(
    async (selectedSemester: Semester) => {
      try {
        setLoading(true);
        const classes = await findBySemesterId(selectedSemester.id);
        setOptions(
          classes.map(c => ({
            value: c,
            label: `${c.disciplina.codigo} - (${c.disciplina.nome} ${c.turma}) - ${c.disciplina.curso}`,
          })),
        );
      } catch ({
        message = 'Erro ao buscar turmas, tente novamente mais tarde!',
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
    },
    [findBySemesterId, toast],
  );

  useDidMount(() => findClasses(semester));

  useEffect(() => {
    if (previousSemester && semester && previousSemester.id !== semester.id) {
      findClasses(semester);
    }
  }, [findClasses, previousSemester, semester, setValue]);

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(onSubmit)}
      paddingY={4}
      width="100%"
    >
      <Select
        {...register('clazz')}
        error={errors.clazz as FieldError}
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
