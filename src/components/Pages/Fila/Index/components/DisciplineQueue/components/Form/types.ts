import { Discipline } from '@models/Discipline';

export interface Fields {
  discipline: Discipline;
}

export interface Props {
  onSelect: OnSelect;
}

export type OnSelect = (discipline: Discipline) => void;
