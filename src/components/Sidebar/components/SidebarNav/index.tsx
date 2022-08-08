import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import {
  RiContactsLine,
  RiCompasses2Line,
  RiLineChartLine,
  RiUserLine,
  RiCalendarEventLine,
  RiCalendarLine,
  RiListUnordered,
  RiMovieLine,
} from 'react-icons/ri';

import { NavLink } from '@components/Sidebar/components/NavLink';
import { NavSection } from '@components/Sidebar/components/NavSection';

import {
  CourseRoute,
  DisciplineRoute,
  QueueRoute,
  RestricaoRoute,
  SemesterRoute,
  TeacherRoute,
  UserRoute,
} from '@enums/Route';

import { useAdminPermission } from '@hooks/useAdminPermission';

const SidebarNav: FC = () => {
  const isAdmin = useAdminPermission({ isAdmin: true });

  return (
    <Stack align="flex-start" spacing="12">
      {isAdmin && (
        <NavSection title="GERENCIAMENTO">
          <NavLink icon={RiContactsLine} href={UserRoute.LIST}>
            Usuários
          </NavLink>
        </NavSection>
      )}

      {isAdmin && (
        <NavSection title="ESTRUTURA">
          <NavLink icon={RiCompasses2Line} href={CourseRoute.LIST}>
            Cursos
          </NavLink>

          <NavLink icon={RiLineChartLine} href={DisciplineRoute.LIST}>
            Disciplinas
          </NavLink>

          <NavLink icon={RiUserLine} href={TeacherRoute.LIST}>
            Professores
          </NavLink>

          <NavLink icon={RiCalendarLine} href={SemesterRoute.LIST}>
            Semestres
          </NavLink>

          <NavLink icon={RiMovieLine} href="/cenario">
            Cenários
          </NavLink>
        </NavSection>
      )}

      {!isAdmin && (
        <NavSection title="MENU">
          <NavLink icon={RiListUnordered} href={QueueRoute.INDEX}>
            Fila
          </NavLink>

          <NavLink icon={RiCalendarEventLine} href={DisciplineRoute.SCHEDULE}>
            Verificar Horário Disciplinas
          </NavLink>

          <NavLink icon={RiCalendarEventLine} href={RestricaoRoute.INDEX}>
            Restrições
          </NavLink>
        </NavSection>
      )}
    </Stack>
  );
};

export { SidebarNav };
