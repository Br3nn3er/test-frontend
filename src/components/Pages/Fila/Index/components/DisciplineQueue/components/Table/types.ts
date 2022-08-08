import { Discipline } from '@models/Discipline';
import { Queue } from '@models/Queue';
import { Semester } from '@models/Semester';

export interface Props {
  discipline: Discipline;
  loading?: boolean;
  queues: Queue[];
  queuesFetched?: boolean;
  semester: Semester;
  showActions?: boolean;
}
