import { ClassQueue } from '@models/Queue';
import { Semester } from '@models/Semester';
import { Teacher } from '@models/Teacher';

export interface Props {
  keyPrefix?: string;
  loading?: boolean;
  queues: ClassQueue[];
  queuesFetched?: boolean;
  semester: Semester;
  showActions?: boolean;
  teacher: Teacher;
}
