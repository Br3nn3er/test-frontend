import { Semester } from '@models/Semester';

export type FormData = {
  ano: number;
  id?: number;
  semestre: number;
  status: boolean;
};

export type OnSubmit = (value: FormData) => void;

export type Props = {
  isUpdate?: boolean;
  loader?: boolean;
  onSubmit: OnSubmit;
  semester?: Semester;
};
