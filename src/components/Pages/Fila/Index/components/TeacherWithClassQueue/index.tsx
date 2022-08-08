import { Flex, usePrevious } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { useClassNewApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';
import { ClassQueue } from '@models/Queue';

import { Form } from './components/Form';
import { OnSelect } from './components/Form/types';
import { Table } from './components/Table';

import { Props } from './types';

const TeacherWithClassQueue: FC<Props> = ({ semester }) => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [professor, setProfessor] = useState<Teacher>();
  const [queues, setQueues] = useState<ClassQueue[]>([]);

  const previousSemester = usePrevious(semester);

  const { findByProfessorSIAPEAndSemesterId } = useClassNewApi();
  const { toast } = useToast();

  const findQueue = useCallback(
    async (selectedTeacher: Teacher) => {
      if (!semester?.id) return;

      try {
        setLoading(true);
        setIsFetched(false);

        const professorClassNew = await findByProfessorSIAPEAndSemesterId(
          selectedTeacher.siape,
          semester.id,
        );
        const queue = professorClassNew.map(c => {
          return {
            ano: c.fila.ano,
            codigo_disc: c.fila.codigo_disc,
            created_at: c.fila.created_at,
            id: c.fila.id,
            periodo_preferencial: c.fila.periodo_preferencial,
            pos: c.fila.pos,
            prioridade: c.prioridade,
            qte_maximo: c.fila.qte_maximo,
            qte_ministrada: c.fila.qte_ministrada,
            semestre: c.fila.semestre,
            siape: c.fila.siape,
            status: c.fila.status,
            disciplina: c.fila.disciplina,
            professor: c.fila.professor,
            turma: c.turma,
          } as ClassQueue;
        });
        setQueues(queue);
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
    [findByProfessorSIAPEAndSemesterId, semester, toast],
  );

  const onSelectProfessor = useCallback<OnSelect>(
    async selectedProfessor => {
      setProfessor(selectedProfessor);
      findQueue(selectedProfessor);
    },
    [findQueue],
  );

  useEffect(() => {
    const semesterHasChanged = previousSemester?.id !== semester?.id;

    if (semesterHasChanged && semester?.id && professor?.siape) {
      findQueue(professor);
    }
  }, [professor, findQueue, previousSemester, semester]);

  return (
    <Flex flexDir="column">
      <Form onSelect={onSelectProfessor} />

      <Table
        keyPrefix="with-class"
        loading={loading}
        queues={queues}
        queuesFetched={isFetched}
        semester={semester}
        teacher={professor}
      />
    </Flex>
  );
};

export { TeacherWithClassQueue };
