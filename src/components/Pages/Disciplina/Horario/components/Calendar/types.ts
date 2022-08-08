import { Ministra } from '@models/Ministra';
import { Oferta } from '@models/Oferta';
import { Semester } from '@models/Semester';

interface OwnProps {
  semester: Semester;
  ministra: Ministra[];
}

export interface CalendarMap {
  [key: string]: Oferta[][];
}

export type Props = OwnProps;
