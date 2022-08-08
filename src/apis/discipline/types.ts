export type CreateData = {
  codigo: string;
  nome: string;
  ch_teorica: number;
  ch_pratica: number;
  ch_total: number;
  curso: string;
  temfila: boolean;
  periodo: number;
  cod_antigo: string;
};

export type UpdateData = {
  nome?: string;
  ch_teorica?: number;
  ch_pratica?: number;
  ch_total?: number;
  curso?: string;
  temfila?: boolean;
  periodo?: number;
};
