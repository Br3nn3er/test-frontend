import { Course } from './Course';

export interface Discipline {
  codigo: string;
  nome: string;
  ch_teorica: number;
  ch_pratica: number;
  ch_total: number;
  curso_disciplinas?: Course;
  curso: string;
  temfila: boolean;
  periodo: number;
  // disciplina: Discipline;
  cod_antigo: string;
  created_at: Date;
}
