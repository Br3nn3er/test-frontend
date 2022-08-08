import { FC, useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  usePrevious,
} from '@chakra-ui/react';

import { PageLoader } from '@components/PageLoader';

import { useScheduleApi } from '@contexts/ApiContext';

import { Turnos } from '@enums/Turnos';

import { useDidMount, usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Ministra } from '@models/Ministra';
import { Schedule } from '@models/Schedule';

import { Td as ItemTd } from './components/Td';
import { getTable, mouseout, mouseover } from './helper';
import { CalendarMap, Props } from './types';

const tableBorder = '1px solid var(--chakra-colors-gray-200)';

const generateCalendarMap = (scheduler: Schedule[]): CalendarMap =>
  scheduler.reduce(
    (prev, cur) => ({
      ...prev,
      [cur.letra]: [],
    }),
    {},
  );

const Calendar: FC<Props> = ({ ministra = [] }) => {
  const [loading, setLoading] = useState(false);
  const [schedulers, setSchedulers] = useState<Schedule[]>([]);
  const [calendarData, setCalendarData] = useState<CalendarMap>();
  const oldMinistra = usePrevious<Ministra[]>(ministra);
  const { toast } = useToast();

  const { findAll } = useScheduleApi();

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
  });

  useEffect(() => {
    if (ministra.length !== oldMinistra?.length) {
      const newCalendarData = generateCalendarMap(schedulers);

      ministra.forEach(({ ofertas, turma }) => {
        ofertas.forEach(oferta => {
          const { letra } = oferta;
          const dia = parseInt(oferta.dia, 10);
          const ofs = newCalendarData[letra][dia - 1];

          if (ofs) {
            if (!ofs.find(({ id }) => id === oferta.id)) {
              ofs.push({ ...oferta, turma });
            }
          } else {
            newCalendarData[letra][dia - 1] = [{ ...oferta, turma }];
          }
        });
      });

      setCalendarData(newCalendarData);
    }
  }, [calendarData, ministra, oldMinistra, schedulers]);

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
      const baseCalendarData = generateCalendarMap(schedulerList);

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
  }, [findAll, toast]);

  usePageDidMount(async () => {
    await fetchSchedulers();
  });

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
              <ItemTd
                allOfertas={calendarData[scheduler.letra]}
                border={tableBorder}
                dia="2"
              />
              <ItemTd
                allOfertas={calendarData[scheduler.letra]}
                border={tableBorder}
                dia="3"
              />
              <ItemTd
                allOfertas={calendarData[scheduler.letra]}
                border={tableBorder}
                dia="4"
              />
              <ItemTd
                allOfertas={calendarData[scheduler.letra]}
                border={tableBorder}
                dia="5"
              />
              <ItemTd
                allOfertas={calendarData[scheduler.letra]}
                border={tableBorder}
                dia="6"
              />
              <ItemTd
                allOfertas={calendarData[scheduler.letra]}
                border={tableBorder}
                dia="7"
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { Calendar };
