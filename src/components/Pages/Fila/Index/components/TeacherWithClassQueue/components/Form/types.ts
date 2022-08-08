import { Teacher } from '@models/Teacher';

export interface Fields {
  teacher: Teacher;
}

export interface Props {
  onSelect: OnSelect;
}

export type OnSelect = (teacher: Teacher) => void;
