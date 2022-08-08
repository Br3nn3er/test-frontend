import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { CanAccess } from '@components/CanAccess';
import { PageHeader } from '@components/PageHeader';
import { PageLoader } from '@components/PageLoader';
import { SemesterForm } from '@components/SemesterForm';
import { OnSelect } from '@components/SemesterForm/types';
import { Wrapper } from '@components/Wrapper';

import { usePageDidMount } from '@hooks/UseDidMount';

import { Semester } from '@models/Semester';

import { ClassQueue } from './components/ClassQueue';
import { DisciplineQueue } from './components/DisciplineQueue';
import { TeacherWithClassQueue } from './components/TeacherWithClassQueue';
import { TeacherQueue } from './components/TeacherWithoutClassQueue';

import { Params } from './types';

const Queue: FC = () => {
  const [semester, setSemester] = useState<Semester>();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabsChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  const { isReady, query } = useRouter();
  const { fila } = query as Params;

  usePageDidMount(() => {
    if (fila) setTabIndex(parseInt(fila, 10));
  });

  const onSelectSemester = useCallback<OnSelect>(selectedSemester => {
    setSemester(selectedSemester);
  }, []);

  return (
    <CanAccess pageTitle="Fila">
      <Wrapper>
        <PageHeader
          title="Fila"
          titleActions={<SemesterForm onSelect={onSelectSemester} />}
        />

        {isReady ? (
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Fila Por Disciplina</Tab>
              <Tab>Fila Por Professor (sem turma)</Tab>
              <Tab>Fila Por Turma</Tab>
              <Tab>Fila Por Professor (com turma)</Tab>
            </TabList>

            <TabPanels>
              <TabPanel paddingX={0}>
                <DisciplineQueue semester={semester} />
              </TabPanel>
              <TabPanel paddingX={0}>
                <TeacherQueue semester={semester} />
              </TabPanel>
              <TabPanel paddingX={0}>
                <ClassQueue semester={semester} />
              </TabPanel>
              <TabPanel paddingX={0}>
                <TeacherWithClassQueue semester={semester} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <PageLoader containerHeight={200} text="Carregando filas" />
        )}
      </Wrapper>
    </CanAccess>
  );
};

export { Queue };
