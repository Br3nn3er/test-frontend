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
import { Table as TeacherQueueTable } from '@components/Pages/Fila/Index/components/TeacherWithoutClassQueue/components/Table';
import { Loader } from '@components/PageList/components/Loader';

import { useQueueApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { Queue } from '@models/Queue';
import { Teacher } from '@models/Teacher';

import { Props } from './types';

const Table: FC<Props> = ({
  loading = false,
  queues = [],
  queuesFetched = false,
  semester,
  showActions = true,
  discipline,
}) => {
  const totalColunms = showActions ? 5 : 4;

  const modalQueue = useRef<ModalQueue>();
  const [teacherQueues, setTeacherQueues] = useState<Queue[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
  const [fetchTeacherQueueLoading, setFetchTeacherQueueLoading] =
    useState(false);

  const { findByTeacherSIAPEAndSemesterId } = useQueueApi();
  const { toast } = useToast();

  const showTeacherQueue = useCallback(
    async (teacher: Teacher) => {
      setSelectedTeacher(teacher);
      setFetchTeacherQueueLoading(true);
      modalQueue.current.show();

      try {
        setTeacherQueues(
          await findByTeacherSIAPEAndSemesterId(teacher.siape, semester.id),
        );
      } catch ({
        message = `Erro ao buscar fila do professor ${teacher.nome}, tente novamente mais tarde!`,
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
    [findByTeacherSIAPEAndSemesterId, semester, toast],
  );

  return (
    <Flex flexDir="column">
      <ModalQueue
        title={`Fila do professor ${selectedTeacher?.nome}`}
        loading={fetchTeacherQueueLoading}
        ref={modalQueue}
      >
        <TeacherQueueTable
          loading={fetchTeacherQueueLoading}
          queues={teacherQueues}
          queuesFetched
          semester={semester}
          showActions={false}
          teacher={selectedTeacher}
        />
      </ModalQueue>

      <TableContainer>
        <ChackraTable colorScheme="whiteAlpha" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Professor</Th>
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

            {!discipline && (
              <Tr>
                <Td colSpan={totalColunms}>
                  <Text color="gray" textAlign="center" fontSize="20px">
                    Nenhum disciplina selecionada
                  </Text>
                </Td>
              </Tr>
            )}

            {queues.map(queue => (
              <Tr key={`queue-${queue.id}`}>
                <Td
                  color={showActions ? 'blue.400' : ''}
                  cursor={showActions ? 'pointer' : ''}
                  onClick={
                    showActions
                      ? () => showTeacherQueue(queue.professor)
                      : undefined
                  }
                >
                  {queue.professor?.nome}
                </Td>
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
                      onClick={() => showTeacherQueue(queue.professor)}
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
