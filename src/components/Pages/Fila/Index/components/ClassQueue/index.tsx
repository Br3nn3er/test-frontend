import { Flex, usePrevious } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { useClassNewApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { Class } from '@models/Class';
import { ClassNew } from '@models/ClassNew';

import { Form } from './components/Form';
import { OnSelect } from './components/Form/types';
import { Table } from './components/Table';
import { Props } from './types';

const ClassQueue: FC<Props> = ({ semester }) => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [clazz, setClass] = useState<Class>();
  const [classesNew, setClassesNew] = useState<ClassNew[]>([]);

  const previousSemester = usePrevious(semester);

  const { findByClassId } = useClassNewApi();
  const { toast } = useToast();

  const findQueue = useCallback(
    async (selectedClass: Class) => {
      if (!selectedClass?.id) return;

      try {
        setLoading(true);
        setIsFetched(false);

        setClassesNew(await findByClassId(selectedClass.id));
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
    [findByClassId, toast],
  );

  const onSelectClass = useCallback<OnSelect>(
    async selectedClass => {
      setClass(selectedClass);
      findQueue(selectedClass);
    },
    [findQueue],
  );

  useEffect(() => {
    const semesterHasChanged = previousSemester?.id !== semester?.id;
    if (semesterHasChanged && semester?.id && clazz?.id) {
      setClass(null);
      setClassesNew([]);
      setIsFetched(false);
    }
  }, [clazz, findQueue, previousSemester, semester]);

  return (
    <Flex flexDir="column">
      {semester && <Form onSelect={onSelectClass} semester={semester} />}

      <Table
        clazz={clazz}
        loading={loading}
        classNew={classesNew}
        queuesFetched={isFetched}
        semester={semester}
        showActions
      />
    </Flex>
  );
};

export { ClassQueue };
