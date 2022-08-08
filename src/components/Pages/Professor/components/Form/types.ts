import { Teacher } from '@models/Teacher';

export type FormData = {
  siape: string;
  nome: string;
  data_ingresso: string;
  data_nasc: string;
  afastado: boolean;
  regime: string;
  carga_atual: number;
  locacao: string;
  cnome: string;
  data_saida: string;
  data_exoneracao: string;
  data_aposentadoria: string;
  status: string;
};

export type OnSubmit = (value: FormData) => void;

export type Props = {
  isUpdate?: boolean;
  loader?: boolean;
  onSubmit: OnSubmit;
  teacher?: Teacher;
};
