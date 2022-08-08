import { Semester } from '@models/Semester';
import { Teacher } from '@models/Teacher';
import { MinistraWithOrigin } from '../../types';

interface OwnProps {
  onSelect: OnSelect;
  semester: Semester;
}

export type OnSelect = (ministra: MinistraWithOrigin[]) => void;

export type Option = {
  label: string;
  value: Teacher;
};

export type Props = OwnProps;
