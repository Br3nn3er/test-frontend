import { Course } from '@models/Course';

export type Props = {
  courses: Course[];
  isFetched?: boolean;
  loadinng?: boolean;
  onRefresh: () => Promise<void>;
};
