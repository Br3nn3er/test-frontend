import { Teacher } from '@models/Teacher';

export type Props = {
  teachers: Teacher[];
  isFetched?: boolean;
  loadinng?: boolean;
  onRefresh: () => Promise<void>;
};
