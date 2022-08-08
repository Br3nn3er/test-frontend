import { Class } from '@models/Class';
import { ClassNew } from '@models/ClassNew';
import { Semester } from '@models/Semester';

export interface Props {
  clazz: Class;
  classNew: ClassNew[];
  loading?: boolean;
  queuesFetched?: boolean;
  semester: Semester;
  showActions?: boolean;
}
