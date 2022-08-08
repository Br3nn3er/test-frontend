import { Restricao } from '@models/Restricao';

interface OwnProps {
  restricoes: Restricao[];
  onChange: OnChange;
}

export interface CalendarMap {
  [key: string]: boolean[];
}

export type Props = OwnProps;

export type OnUpdate = (data: Restricao[]) => void;

export type OnChange = (data: Restricao[]) => void;
