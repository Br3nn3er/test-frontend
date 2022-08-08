import { Semester } from '@models/Semester';

export interface Fields {
  semester: Semester;
}

export interface Props {
  onSelect: OnSelect;
}

export type OnSelect = (semester: Semester) => void;
