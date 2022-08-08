import { Class } from './Class';
import { Schedule } from './Schedule';

export interface Oferta {
  id: string;
  dia: string;
  horario: Schedule;
  letra: string;
  turma: Class;
  id_turma: number;
  created_at: string;
}
