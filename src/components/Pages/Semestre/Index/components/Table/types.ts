import { Semester } from '@models/Semester';

export type Props = {
  isFetched?: boolean;
  loadinng?: boolean;
  onRefresh: () => Promise<void>;
  semesters: Semester[];
};
