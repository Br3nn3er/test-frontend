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
import { Table as TeacherQueueTable } from '@components/Pages/Fila/Index/components/TeacherWithClassQueue/components/Table';
import { Loader } from '@components/PageList/components/Loader';

import { useClassNewApi } from '@contexts/ApiContext';

import { useToast } from '@hooks/useToast';

import { ClassQueue } from '@models/Queue';
import { Teacher } from '@models/Teacher';

import { Props } from './types';

const Table: FC<Props> = ({
  clazz,
  classNew = [],
  loading = false,
  queuesFetched = false,
  semester,
  showActions = true,
}) => {
  const totalColunms = showActions ? 5 : 4;

  const modalQueue = useRef<ModalQueue>();
  const [teacherQueues, setTeacherQueues] = useState<ClassQueue[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
  const [fetchTeacherQueueLoading, setFetchTeacherQueueLoading] =
    useState(false);

  const { findByProfessorSIAPEAndSemesterId } = useClassNewApi();
  const { toast } = useToast();

  const showTeacherQueue = useCallback(
    async (teacher: Teacher) => {
      setSelectedTeacher(teacher);
      setFetchTeacherQueueLoading(true);
      modalQueue.current.show();

      try {
        const professorClassNew = await findByProfessorSIAPEAndSemesterId(
          teacher.siape,
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
        setTeacherQueues(queue);
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
    [findByProfessorSIAPEAndSemesterId, semester, toast],
  );

  return (
    <Flex display="block" overflow="auto">
      <ModalQueue
        title={`Fila do professor ${selectedTeacher?.nome} - ${semester?.ano}/${semester?.semestre}`}
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

            {queuesFetched && !classNew.length && (
              <Tr>
                <Td colSpan={totalColunms}>
                  <Text color="gray" textAlign="center" fontSize="20px">
                    Nenhuma fila encontrada
                  </Text>
                </Td>
              </Tr>
            )}

            {!clazz && (
              <Tr>
                <Td colSpan={totalColunms}>
                  <Text color="gray" textAlign="center" fontSize="20px">
                    Nenhuma turma selecionada
                  </Text>
                </Td>
              </Tr>
            )}

            {classNew.map(queue => (
              <Tr key={`class-new-queue-${queue.id_fila}`}>
                <Td
                  color={showActions ? 'blue.400' : ''}
                  cursor={showActions ? 'pointer' : ''}
                  onClick={
                    showActions
                      ? () => showTeacherQueue(queue?.fila.professor)
                      : undefined
                  }
                >
                  {queue?.fila?.professor?.nome}
                </Td>
                <Td textAlign="center">{queue?.fila?.pos}</Td>
                <Td textAlign="center">{queue.prioridade}</Td>
                <Td textAlign="center">
                  {queue?.fila?.qte_ministrada}/{queue?.fila?.qte_maximo}
                </Td>
                {showActions && (
                  <Td textAlign="center">
                    <Button
                      as="a"
                      colorScheme="teal"
                      cursor="pointer"
                      fontSize="sm"
                      onClick={() => showTeacherQueue(queue?.fila?.professor)}
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
