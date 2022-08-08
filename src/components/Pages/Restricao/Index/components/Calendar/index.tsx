import { FC, useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  Box,
} from '@chakra-ui/react';

import { PageLoader } from '@components/PageLoader';

import { useScheduleApi } from '@contexts/ApiContext';

import { Turnos } from '@enums/Turnos';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Restricao } from '@models/Restricao';
import { Schedule } from '@models/Schedule';

import { getTable, mouseout, mouseover } from './helper';
import { CalendarMap, Props } from './types';

const tableBorder = '1px solid var(--chakra-colors-gray-200)';

const generateCalendarMap = (
  scheduler: Schedule[],
  restricoes: Restricao[] = [],
): CalendarMap => {
  const calendarMap: CalendarMap = scheduler.reduce(
    (prev, cur) => ({
      ...prev,
      [cur.letra]: [false, false, false, false, false, false, false, false],
    }),
    {},
  );

  restricoes.forEach(restricao => {
    calendarMap[restricao.letra][parseInt(restricao.dia, 10)] = true;
  });

  return calendarMap;
};

const Calendar: FC<Props> = ({ onChange, restricoes }) => {
  const [loading, setLoading] = useState(false);
  const [schedulers, setSchedulers] = useState<Schedule[]>([]);
  const [calendarData, setCalendarData] = useState<CalendarMap>();
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
      const baseCalendarData = generateCalendarMap(schedulerList, restricoes);

      setSchedulers(schedulerList);
      setCalendarData(baseCalendarData);
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
  }, [restricoes, findAll, toast]);

  useEffect(() => {
    if (schedulers.length && restricoes.length) {
      setCalendarData(generateCalendarMap(schedulers, restricoes));
    }
  }, [schedulers, restricoes]);

  useDidMount(() => {
    const interval = setInterval(() => {
      const table = getTable();

      if (table) {
        clearInterval(interval);

        const events = { mouseover, mouseout };

        table.addEventListener('mouseover', events.mouseover);
        table.addEventListener('mouseout', events.mouseout);
      }
    }, 500);

    fetchSchedulers();
  });

  const update = useCallback(
    (cd: CalendarMap) => {
      const data: Restricao[] = [];

      Object.keys(cd).forEach(letra => {
        cd[letra].forEach((value, index) => {
          if (value) data.push({ dia: index.toString(), letra });
        });
      });

      onChange(data);
    },
    [onChange],
  );

  const onSelect = useCallback(
    (letra: string, dia: string) => {
      const newCalendarData = generateCalendarMap(schedulers);

      Object.keys(calendarData).forEach(l => {
        calendarData[l].forEach((value, index) => {
          if (value) newCalendarData[l][index] = true;
        });
      });

      newCalendarData[letra][dia] = !calendarData[letra][dia];
      setCalendarData(newCalendarData);
      update(newCalendarData);
    },
    [calendarData, schedulers, update],
  );

  if (loading) {
    return <PageLoader containerHeight="100%" text="Carregando dados..." />;
  }

  return (
    <TableContainer>
      <Table
        className="calendar"
        colorScheme="whiteAlpha"
        size="sm"
        variant="simple"
      >
        <Thead>
          <Tr border={tableBorder}>
            <Th border={tableBorder} textAlign="center" />
            <Th border={tableBorder} textAlign="center">
              Segunda-feira
            </Th>
            <Th border={tableBorder} textAlign="center">
              Terça-feira
            </Th>
            <Th border={tableBorder} textAlign="center">
              Quarta-feira
            </Th>
            <Th border={tableBorder} textAlign="center">
              Quinta-feira
            </Th>
            <Th border={tableBorder} textAlign="center">
              Sexta-feira
            </Th>
            <Th border={tableBorder} textAlign="center">
              Sábado
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {schedulers.map(scheduler => (
            <Tr border={tableBorder} key={`scheduler-${scheduler.letra}`}>
              <Td
                border={tableBorder}
                color="gray.600"
                fontWeight="bold"
                textAlign="left"
              >
                {`${scheduler.hora_inicio.substring(0, 5)} (${
                  scheduler.letra
                })`}
              </Td>
              <Td
                border={tableBorder}
                padding={0}
                textAlign="center"
                onClick={() => onSelect(scheduler.letra, '2')}
              >
                {calendarData[scheduler.letra][2] && (
                  <Box bg="red.500" height="32px" width="100%">
                    {calendarData[scheduler.letra][2]}
                  </Box>
                )}
              </Td>
              <Td
                border={tableBorder}
                padding={0}
                textAlign="center"
                onClick={() => onSelect(scheduler.letra, '3')}
              >
                {calendarData[scheduler.letra][3] && (
                  <Box bg="red.500" height="32px" width="100%">
                    {calendarData[scheduler.letra][3]}
                  </Box>
                )}
              </Td>
              <Td
                border={tableBorder}
                padding={0}
                textAlign="center"
                onClick={() => onSelect(scheduler.letra, '4')}
              >
                {calendarData[scheduler.letra][4] && (
                  <Box bg="red.500" height="32px" width="100%">
                    {calendarData[scheduler.letra][4]}
                  </Box>
                )}
              </Td>
              <Td
                bg={calendarData[scheduler.letra][5] ? 'red' : 'transparent'}
                border={tableBorder}
                padding={0}
                textAlign="center"
                onClick={() => onSelect(scheduler.letra, '5')}
              >
                {calendarData[scheduler.letra][5] && (
                  <Box bg="red.500" height="32px" width="100%">
                    {calendarData[scheduler.letra][5]}
                  </Box>
                )}
              </Td>
              <Td
                border={tableBorder}
                padding={0}
                textAlign="center"
                onClick={() => onSelect(scheduler.letra, '6')}
              >
                {calendarData[scheduler.letra][6] && (
                  <Box bg="red.500" height="32px" width="100%">
                    {calendarData[scheduler.letra][6]}
                  </Box>
                )}
              </Td>
              <Td
                border={tableBorder}
                padding={0}
                textAlign="center"
                onClick={() => onSelect(scheduler.letra, '7')}
              >
                {calendarData[scheduler.letra][7] && (
                  <Box bg="red.500" height="32px" width="100%">
                    {calendarData[scheduler.letra][7]}
                  </Box>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { Calendar };
