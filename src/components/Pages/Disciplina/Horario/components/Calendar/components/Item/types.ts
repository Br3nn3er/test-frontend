import { Oferta } from '@models/Oferta';

interface OwnProps {
  hasConflict?: boolean;
  oferta: Oferta;
}

export type Props = OwnProps;
