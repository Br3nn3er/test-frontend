export type CreateData = {
  ano: number;
  codigo_disc: string;
  ch: number;
  semestre: number;
  turma: string;
};

export type UpdateData = {
  ano?: number;
  codigo_disc?: string;
  ch?: number;
  semestre?: number;
  turma?: string;
};
