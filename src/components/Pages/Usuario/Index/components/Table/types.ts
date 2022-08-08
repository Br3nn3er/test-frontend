import { User } from '@models/User';

export type Props = {
  isFetched?: boolean;
  loadinng?: boolean;
  onRefresh: () => Promise<void>;
  users: User[];
};
