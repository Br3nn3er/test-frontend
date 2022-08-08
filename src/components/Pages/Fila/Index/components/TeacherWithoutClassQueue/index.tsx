import { Flex, usePrevious } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { useQueueApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';
import { Queue } from '@models/Queue';

import { Form } from './components/Form';
import { OnSelect } from './components/Form/types';
import { Table } from './components/Table';

import { Props } from './types';

const TeacherQueue: FC<Props> = ({ semester }) => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [teacher, setTeacher] = useState<Teacher>();
  const [queues, setQueues] = useState<Queue[]>([]);

  const previousSemester = usePrevious(semester);

  const { findByTeacherSIAPEAndSemesterId } = useQueueApi();
  const { toast } = useToast();

  const findQueue = useCallback(
    async (selectedTeacher: Teacher) => {
      if (!semester?.id) return;

      try {
        setLoading(true);
        setIsFetched(false);

        setQueues(
          await findByTeacherSIAPEAndSemesterId(
            selectedTeacher.siape,
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
    [findByTeacherSIAPEAndSemesterId, semester, toast],
  );

  const onSelectDiscipline = useCallback<OnSelect>(
    async selectedTeacher => {
      setTeacher(selectedTeacher);
      findQueue(selectedTeacher);
    },
    [findQueue],
  );

  useEffect(() => {
    const semesterHasChanged = previousSemester?.id !== semester?.id;

    if (semesterHasChanged && semester?.id && teacher?.siape) {
      findQueue(teacher);
    }
  }, [teacher, findQueue, previousSemester, semester]);

  return (
    <Flex flexDir="column">
      <Form onSelect={onSelectDiscipline} />

      <Table
        loading={loading}
        queues={queues}
        queuesFetched={isFetched}
        semester={semester}
        teacher={teacher}
      />
    </Flex>
  );
};

export { TeacherQueue };
