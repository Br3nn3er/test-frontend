import { Oferta } from '@models/Oferta';

interface OwnProps {
  allOfertas: Oferta[][];
  border: string;
  dia: string;
}

export type Props = OwnProps;
