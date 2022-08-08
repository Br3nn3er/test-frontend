import { FC, useCallback, useState } from 'react';
import {
  Table,
  TableContainer,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';

import { PageLoader } from '@components/PageLoader';

import { useScheduleApi } from '@contexts/ApiContext';

import { Turnos } from '@enums/Turnos';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Restricao } from '@models/Restricao';
import { Schedule } from '@models/Schedule';

import { Props } from './types';

const tableBorder = '1px solid var(--chakra-colors-gray-200)';

const getSchedulerText = (restricao: Restricao, schedulers: Schedule[]) => {
  const scheduler = schedulers.find(s => s.letra === restricao.letra);
  return `${scheduler?.hora_inicio} - ${scheduler?.hora_fim} (${restricao?.letra})`;
};

const dayName = [
  '',
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexata-feira',
  'Sábado',
];

const ListaRestricoes: FC<Props> = ({ restricoes }) => {
  const [loading, setLoading] = useState(false);
  const [schedulers, setSchedulers] = useState<Schedule[]>([]);
  const { toast } = useToast();

  const { findAll } = useScheduleApi();

  const fetchSchedulers = useCallback(async () => {
    setLoading(true);

    try {
      const schedulerList = await findAll();
      schedulerList.sort((a, b) => {
        if (Turnos[a.turno] > Turnos[b.turno]) return 1;
        if (Turnos[b.turno] > Turnos[a.turno]) return -1;

        if (a.letra > b.letra) return 1;
        if (b.letra > a.letra) return -1;

        return 0;
      });

      setSchedulers(schedulerList);
    } catch ({
      message = 'Erro ao buscar horários, tente novamente mais tarde',
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
  }, [findAll, toast]);

  useDidMount(() => {
    fetchSchedulers();
  });

  if (loading) {
    return <PageLoader containerHeight="100%" text="Carregando horários..." />;
  }

  return (
    <Box>
      <Text fontWeight="bold">Informações das restrições</Text>
      <Divider orientation="horizontal" />

      <TableContainer>
        <Table colorScheme="whiteAlpha" size="sm" variant="simple">
          <Thead>
            <Tr border={tableBorder}>
              <Th border={tableBorder} textAlign="center">
                Dia
              </Th>
              <Th border={tableBorder} textAlign="center">
                Horário (letra)
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {restricoes.map((restricao, index) => (
              <Tr
                border={tableBorder}
                key={`restricao-${restricao.letra}-${index}`}
              >
                <Td border={tableBorder}>
                  <Text>
                    {dayName[restricao.dia]} - ({restricao.dia})
                  </Text>
                </Td>
                <Td border={tableBorder}>
                  <Text>{getSchedulerText(restricao, schedulers)}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export { ListaRestricoes };
