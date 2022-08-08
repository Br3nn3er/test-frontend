import { FC } from 'react';
import { Td as ChakraTd } from '@chakra-ui/react';

import { Item } from '@components/Pages/Disciplina/Horario/components/Calendar/components/Item';

import { Props } from './types';

const Td: FC<Props> = ({ allOfertas, border, dia }) => (
  <ChakraTd border={border} padding={0} textAlign="center">
    {allOfertas.map(ofertas =>
      ofertas
        ?.filter(oferta => oferta.dia === dia)
        .map((oferta, index, array) => (
          <Item
            hasConflict={array.length > 1}
            key={`oferta-${index}-${dia}-${oferta.id}`}
            oferta={oferta}
          />
        )),
    )}
  </ChakraTd>
);

export { Td };
