import {
  Button,
  Flex,
  Icon,
  Table as ChackraTable,
  TableContainer,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { FC, useCallback, useRef, useState } from 'react';
import { RiProfileLine } from 'react-icons/ri';

import { ModalQueue } from '@components/ModalQueue';
import { Table as DisciplineQueueTable } from '@components/Pages/Fila/Index/components/DisciplineQueue/components/Table';
import { Loader } from '@components/PageList/components/Loader';

import { useQueueApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { ClassQueue, Queue } from '@models/Queue';

import { Props } from './types';

const Table: FC<Props> = ({
  keyPrefix = '',
  loading = false,
  queues = [],
  queuesFetched = false,
  semester,
  showActions = true,
  teacher,
}) => {
  const totalColunms = showActions ? 7 : 6;

  const modalQueue = useRef<ModalQueue>();
  const [teacherQueues, setDisciplineQueues] = useState<Queue[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<ClassQueue>();
  const [fetchTeacherQueueLoading, setFetchTeacherQueueLoading] =
    useState(false);

  const { findByDisciplineCodeAndSemesterId } = useQueueApi();
  const { toast } = useToast();

  const showDisciplineQueue = useCallback(
    async (queue: ClassQueue) => {
      setSelectedQueue(queue);
      setFetchTeacherQueueLoading(true);
      modalQueue.current.show();

      try {
        setDisciplineQueues(
          await findByDisciplineCodeAndSemesterId(
            queue.disciplina.codigo,
            semester.id,
          ),
        );
      } catch ({
        message = `Erro ao buscar fila da disciplina ${queue.disciplina.nome}, tente novamente mais tarde!`,
      }) {
        modalQueue.current.hide();

        toast({
          description: message,
          duration: 5000,
          status: 'error',
          title: 'Erro',
        });
      } finally {
        setFetchTeacherQueueLoading(false);
      }
    },
    [findByDisciplineCodeAndSemesterId, semester, toast],
  );

  return (
    <Flex flexDir="column">
      <ModalQueue
        title={`
${selectedQueue?.disciplina.codigo} - ${selectedQueue?.disciplina.nome} (${selectedQueue?.turma.turma}) - ${semester?.ano}/${semester?.semestre}
        `}
        loading={fetchTeacherQueueLoading}
        ref={modalQueue}
      >
        <DisciplineQueueTable
          discipline={selectedQueue?.disciplina}
          loading={fetchTeacherQueueLoading}
          queues={teacherQueues}
          queuesFetched
          semester={semester}
          showActions={false}
        />
      </ModalQueue>

      <TableContainer>
        <ChackraTable colorScheme="whiteAlpha" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Disciplina</Th>
              <Th textAlign="center">Turma</Th>
              <Th textAlign="center">Curso</Th>
              <Th textAlign="center">Posição na fila</Th>
              <Th textAlign="center">Prioridade</Th>
              <Th textAlign="center">Qte. Min/Qte. Max</Th>
              {showActions && <Th textAlign="center">Ações</Th>}
            </Tr>
          </Thead>

          <Tbody>
            {loading && <Loader columns={totalColunms} lines={3} />}

            {queuesFetched && !queues.length && (
              <Tr>
                <Td colSpan={totalColunms}>
                  <Text color="gray" textAlign="center" fontSize="20px">
                    Nenhuma fila encontrada
                  </Text>
                </Td>
              </Tr>
            )}

            {!teacher && (
              <Tr>
                <Td colSpan={totalColunms}>
                  <Text color="gray" textAlign="center" fontSize="20px">
                    Nenhum professor selecionado
                  </Text>
                </Td>
              </Tr>
            )}

            {queues.map(queue => (
              <Tr key={`${keyPrefix}-queue-${queue.id}-${queue.turma.id}`}>
                <Td
                  color={showActions ? 'blue.400' : ''}
                  cursor={showActions ? 'pointer' : ''}
                  onClick={
                    showActions ? () => showDisciplineQueue(queue) : undefined
                  }
                >
                  {queue?.disciplina?.codigo} - {queue.disciplina?.nome}
                </Td>
                <Td>{queue.turma?.turma}</Td>
                <Td>{queue.disciplina?.curso_disciplinas?.nome}</Td>
                <Td textAlign="center">{queue.pos}</Td>
                <Td textAlign="center">{queue.prioridade}</Td>
                <Td textAlign="center">
                  {queue.qte_ministrada}/{queue.qte_maximo}
                </Td>
                {showActions && (
                  <Td textAlign="center">
                    <Button
                      as="a"
                      colorScheme="teal"
                      cursor="pointer"
                      fontSize="sm"
                      onClick={() => showDisciplineQueue(queue)}
                      size="sm"
                      textAlign="center"
                    >
                      <Icon as={RiProfileLine} fontSize="16" />
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </ChackraTable>
      </TableContainer>
    </Flex>
  );
};

export { Table };
