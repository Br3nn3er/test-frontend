import { Discipline } from '@models/Discipline';

export type Props = {
  disciplines: Discipline[];
  isFetched?: boolean;
  loading?: boolean;
  onRefresh: () => Promise<void>;
};
