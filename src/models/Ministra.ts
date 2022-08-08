import { Teacher } from './Teacher';
import { Class } from './Class';
import { Oferta } from './Oferta';

export interface Ministra {
  professor: Teacher;
  siape: string;
  turma: Class;
  ofertas: Oferta[];
  id_turma: string;
  created_at: string;
}
