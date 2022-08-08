import { Box, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useCallback, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';

import { useMinistraApi, useTeacherApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';

import { Option, Props } from './types';
import { MinistraWithOrigin } from '../../types';

const ProfessorForm: FC<Props> = ({ onSelect, semester }) => {
  const [professors, setProfesssors] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState<MultiValue<Option>>([]);
  const { findAll } = useTeacherApi();
  const { findByProfessorAndSemester } = useMinistraApi();
  const { toast } = useToast();

  useDidMount(async () => {
    setLoading(true);

    try {
      setProfesssors(await findAll());
    } catch ({
      message = 'Erro ao buscar professores, tente novamente mais tarde',
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

  useEffect(() => {
    if (semester?.id) setFormValue([]);
  }, [semester?.id]);

  const findMinistra = useCallback(
    async (professores: Teacher[]) => {
      setLoading(true);

      try {
        const ministraList = await findByProfessorAndSemester(
          professores.map(({ siape }) => siape),
          semester.id,
        );
        onSelect(
          ministraList.map(
            ministra =>
              ({
                ...ministra,
                origin: 'PROFESSOR',
              } as MinistraWithOrigin),
          ),
        );
      } catch ({
        message = 'Erro ao buscar professores, tente novamente mais tarde',
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
    [findByProfessorAndSemester, onSelect, semester, toast],
  );

  const onChange = useCallback(
    (opt: MultiValue<Option>) => {
      setFormValue(opt);
      findMinistra(opt.map(({ value }) => value));
    },
    [findMinistra],
  );

  return (
    <Box mb={5}>
      <Text>Por professor:</Text>

      <Select
        options={professors.map(professor => ({
          label: professor.nome,
          value: professor,
        }))}
        isMulti
        onChange={onChange}
        size="sm"
        isLoading={loading}
        placeholder="Selecione ao menos um professor"
        value={formValue}
      />
    </Box>
  );
};

export { ProfessorForm };
