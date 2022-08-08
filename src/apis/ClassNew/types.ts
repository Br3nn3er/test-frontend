export type CreateData = {
  siape: string;
  codigo_disc: string;
  pos: number;
  prioridade: number;
  qte_ministrada: number;
  qte_maximo: number;
  ano: number;
  semestre: number;
  status: number;
  periodo_preferencial: boolean;
};

export type UpdateData = {
  siape?: string;
  codigo_disc?: string;
  pos?: number;
  prioridade?: number;
  qte_ministrada?: number;
  qte_maximo?: number;
  ano?: number;
  semestre?: number;
  status?: number;
  periodo_preferencial?: boolean;
};
