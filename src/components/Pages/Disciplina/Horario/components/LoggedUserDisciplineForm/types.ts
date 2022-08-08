import { ClassNew } from '@models/ClassNew';
import { Semester } from '@models/Semester';

import {
  MinistraWithOrigin,
  Origin,
} from '@components/Pages/Disciplina/Horario/types';

interface OwnProps {
  origin: Origin;
  onSelect: OnSelect;
  semester: Semester;
}

export type OnSelect = (ministra: MinistraWithOrigin[], origin: Origin) => void;

export type Option = {
  label: string;
  value: ClassNew;
};

export type Props = OwnProps;
