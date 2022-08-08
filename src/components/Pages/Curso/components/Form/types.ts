import { Course } from '@models/Course';

export type FormData = {
  campus: string;
  code: string;
  name: string;
  periodClash: boolean;
  timeClash: boolean;
  unit: string;
};

export type OnSubmit = (value: FormData) => void;

export type Props = {
  course?: Course;
  isUpdate?: boolean;
  loader?: boolean;
  onSubmit: OnSubmit;
};
