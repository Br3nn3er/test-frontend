import { Discipline } from './Discipline';

export interface Class {
  ano: number;
  codigo_disc: string;
  ch: number;
  disciplina?: Discipline;
  id: number;
  semestre: number;
  turma: string;
}
