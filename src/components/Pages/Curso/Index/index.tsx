import Router from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { Role } from '@components/CanAccess/types';
import { PageListHeader } from '@components/PageList/components/Header';
import { Wrapper } from '@components/Wrapper';

import { useCourseApi } from '@contexts/ApiContext';

import { CourseRoute } from '@enums/Route';

import { usePageDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Course } from '@models/Course';

import { Table } from './components/Table';

const userRole = [Role.ADMIN];

const CoursesList: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const { toast } = useToast();

  const { findAll } = useCourseApi();

  const onCreate = useCallback(() => {
    Router.push(CourseRoute.CREATE);
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);

    try {
      const coursesList = await findAll();
      setCourses(coursesList.map(course => ({ ...course, checked: false })));
    } catch ({
      message = 'Erro ao buscar cursos, tente novamente mais tarde',
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
  }, [findAll, toast]);

  usePageDidMount(async () => {
    await fetchCourses();
  });

  return (
    <CanAccess pageTitle="Listagem de cursos" userRole={userRole}>
      <Wrapper>
        <PageListHeader onCreate={onCreate} title="Cursos" />

        <Table
          courses={courses}
          isFetched={isFetched}
          loadinng={loading}
          onRefresh={fetchCourses}
        />
      </Wrapper>
    </CanAccess>
  );
};

export { CoursesList };
