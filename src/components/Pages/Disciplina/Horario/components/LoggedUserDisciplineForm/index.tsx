import { Box, Text, usePrevious } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useCallback, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';

import { useMinistraApi, useClassNewApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { ClassNew } from '@models/ClassNew';
import { Semester } from '@models/Semester';

import { Option, Props } from './types';
import { MinistraWithOrigin } from '../../types';

const LoggedUserDisciplineForm: FC<Props> = ({
  origin,
  onSelect,
  semester,
}) => {
  const [classNewsList, setClassNewList] = useState<ClassNew[]>([]);
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState<MultiValue<Option>>([]);

  const { findByLoggedUserAndSemesterId } = useClassNewApi();
  const { findByLoggedUserAndClassAndSemester } = useMinistraApi();
  const { toast } = useToast();
  const oldSemester = usePrevious(semester);

  const findClassNewList = useCallback(
    async (selectedSemester: Semester) => {
      setLoading(true);

      try {
        setClassNewList(
          await findByLoggedUserAndSemesterId(
            selectedSemester.id,
            origin === 'LOGGED_USER_NOT_QUEUE_DISCIPLINES',
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
    [findByLoggedUserAndSemesterId, origin, toast],
  );

  useDidMount(async () => {
    if (semester?.id) findClassNewList(semester);
  });

  useEffect(() => {
    if (oldSemester?.id !== semester?.id) {
      setFormValue([]);
      findClassNewList(semester);
    }
  }, [findClassNewList, oldSemester, semester]);

  const findMinistra = useCallback(
    async (list: ClassNew[]) => {
      setLoading(true);

      try {
        const ministraList = await findByLoggedUserAndClassAndSemester(
          // eslint-disable-next-line camelcase
          list.map(({ id_turma }) => id_turma),
          semester.id,
        );
        onSelect(
          ministraList.map(
            ministra => ({ ...ministra, origin } as MinistraWithOrigin),
          ),
          origin,
        );
      } catch ({
        message = 'Erro ao buscar disciplinas, tente novamente mais tarde',
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
    [findByLoggedUserAndClassAndSemester, origin, onSelect, semester, toast],
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
      {origin === 'LOGGED_USER_QUEUE_DISCIPLINES' ? (
        <Text>Disciplinas que estão da minha fila:</Text>
      ) : (
        <p>
          Disciplinas que <span style={{ fontWeight: 'bold' }}>não estão</span>{' '}
          na minha fila:
        </p>
      )}
      <Select
        options={classNewsList.map(classNew => ({
          label: `${classNew?.turma.codigo_disc} - ${classNew?.fila.disciplina.nome} (${classNew?.turma.turma}) - ${classNew?.fila.disciplina.curso}`,
          value: classNew,
        }))}
        isMulti
        onChange={onChange}
        size="sm"
        isLoading={loading}
        placeholder="Selecione ao menos uma disciplina"
        value={formValue}
      />
    </Box>
  );
};

export { LoggedUserDisciplineForm };
