import { Class } from './Class';
import { Queue } from './Queue';

export interface ClassNew {
  fila?: Queue;
  id_fila: number;
  id_turma: number;
  prioridade: number;
  turma?: Class;
}
