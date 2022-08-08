import { Class } from '@models/Class';
import { Semester } from '@models/Semester';

export interface Fields {
  clazz: Class;
}

export interface Props {
  onSelect: OnSelect;
  semester: Semester;
}

export type OnSelect = (clazz: Class) => void;
