import { Flex, usePrevious } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { useQueueApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { Discipline } from '@models/Discipline';
import { Queue } from '@models/Queue';

import { Form } from './components/Form';
import { OnSelect } from './components/Form/types';
import { Table } from './components/Table';
import { Props } from './types';

const DisciplineQueue: FC<Props> = ({ semester }) => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [discipline, setDiscipline] = useState<Discipline>();
  const [queues, setQueues] = useState<Queue[]>([]);

  const previousSemester = usePrevious(semester);

  const { findByDisciplineCodeAndSemesterId } = useQueueApi();
  const { toast } = useToast();

  const findQueue = useCallback(
    async (selectedDiscipline: Discipline) => {
      if (!semester?.id) return;

      try {
        setLoading(true);
        setIsFetched(false);

        setQueues(
          await findByDisciplineCodeAndSemesterId(
            selectedDiscipline.codigo,
            semester.id,
          ),
        );
      } catch ({
        message = 'Erro ao buscar fila, tente novamente mais tarde!',
      }) {
        toast({
          description: message,
          duration: 5000,
          status: 'error',
          title: 'Erro',
        });
      } finally {
        setLoading(false);
        setIsFetched(true);
      }
    },
    [findByDisciplineCodeAndSemesterId, semester, toast],
  );

  const onSelectDiscipline = useCallback<OnSelect>(
    async selectedDiscipline => {
      setDiscipline(selectedDiscipline);
      findQueue(selectedDiscipline);
    },
    [findQueue],
  );

  useEffect(() => {
    const semesterHasChanged = previousSemester?.id !== semester?.id;

    if (semesterHasChanged && semester?.id && discipline?.codigo) {
      findQueue(discipline);
    }
  }, [discipline, findQueue, previousSemester, semester]);

  return (
    <Flex flexDir="column">
      <Form onSelect={onSelectDiscipline} />

      <Table
        discipline={discipline}
        loading={loading}
        queues={queues}
        queuesFetched={isFetched}
        semester={semester}
        showActions
      />
    </Flex>
  );
};

export { DisciplineQueue };
