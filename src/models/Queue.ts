import { Class } from './Class';
import { Discipline } from './Discipline';
import { Teacher } from './Teacher';

export interface Queue {
  id: number;
  professor?: Teacher;
  siape: string;
  disciplina?: Discipline;
  codigo_disc: string;
  pos: number;
  prioridade: number;
  qte_ministrada: number;
  qte_maximo: number;
  ano: number;
  semestre: number;
  status: number;
  periodo_preferencial: boolean;
  created_at: Date;
}

export interface ClassQueue extends Queue {
  turma: Class;
}
