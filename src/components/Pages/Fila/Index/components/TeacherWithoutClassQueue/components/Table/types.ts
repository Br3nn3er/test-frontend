import { Queue } from '@models/Queue';
import { Semester } from '@models/Semester';
import { Teacher } from '@models/Teacher';

export interface Props {
  loading?: boolean;
  queues: Queue[];
  queuesFetched?: boolean;
  semester: Semester;
  showActions?: boolean;
  teacher: Teacher;
}
