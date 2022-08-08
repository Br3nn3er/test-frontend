import { Discipline } from '@models/Discipline';

export type FormData = {
  codigo: string;
  cod_antigo: string;
  nome: string;
  ch_teorica: number;
  ch_pratica: number;
  ch_total: number;
  curso: string;
  temfila: boolean;
  periodo: number;
};

export type OnSubmit = (value: FormData) => void;

export type Props = {
  discipline?: Discipline;
  isUpdate?: boolean;
  loader?: boolean;
  onSubmit: OnSubmit;
};
