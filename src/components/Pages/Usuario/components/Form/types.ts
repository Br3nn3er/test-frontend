import { User } from '@models/User';

export type FormData = {
  id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
  siape?: string;
  password?: string;
  password_confirmation?: string;
};

export type OnSubmit = (value: FormData) => void;

export type Props = {
  isUpdate?: boolean;
  loader?: boolean;
  onSubmit: OnSubmit;
  user?: User;
};
