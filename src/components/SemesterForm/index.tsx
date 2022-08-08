import { Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FC, useCallback, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Select } from '@components/Form/Select2';
import { Option } from '@components/Form/Select2/types';

import { useSemesterApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Semester } from '@models/Semester';

import { Fields, Props } from './types';

const formSchema = yup.object().shape({
  semester: yup
    .object()
    .required('Campo obrigatório')
    .typeError('Campo Obrigratório'),
});

const SemesterForm: FC<Props> = ({ onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option<Semester>[]>([]);
  const { findAll } = useSemesterApi();
  const { toast } = useToast();

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<Fields>({
      resolver: yupResolver(formSchema),
    });
  const { errors } = formState;

  const onSubmit = useCallback(
    (value: Fields) => {
      onSelect(value.semester);
    },
    [onSelect],
  );

  const onChange = useCallback(
    (semester: Semester) => {
      setValue('semester', semester);
      handleSubmit(onSubmit)();
    },
    [handleSubmit, setValue, onSubmit],
  );

  useDidMount(async () => {
    try {
      setLoading(true);
      const semesters = await findAll();
      setOptions(
        semesters
          .sort((semesterA, semesterB) => {
            if (semesterA.ano !== semesterB.ano) {
              return semesterB.ano - semesterA.ano;
            }
            if (semesterA.semestre !== semesterB.semestre) {
              return semesterB.semestre - semesterA.semestre;
            }
            return 0;
          })
          .map(semester => ({
            value: semester,
            label: semester.status
              ? `${semester.ano}/${semester.semestre} (ativos)`
              : `${semester.ano}/${semester.semestre}`,
          })),
      );
      onChange(semesters.find(semester => semester.status));
    } catch ({
      message = 'Erro ao buscar semestres, tente novamente mais tarde!',
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
      minW={180}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Select
        {...register('semester')}
        error={errors.semester as FieldError}
        isClearable={false}
        isDisabled={loading}
        isLoading={loading}
        placeholder="Selecione um semestre"
        onChange={onChange}
        options={options}
        value={options.find(
          option => option.value.id === getValues().semester?.id,
        )}
      />
    </Flex>
  );
};

export { SemesterForm };
