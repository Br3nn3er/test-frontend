import { Box, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

import { Props } from './types';

const Item: FC<Props> = ({ hasConflict = false, oferta }) => (
  <Box
    alignItems="center"
    justifyContent="center"
    display="flex"
    bg={hasConflict ? 'red.500' : 'blue.500'}
    borderRadius="sm"
    color="white"
    h={8}
    px={4}
  >
    <Text color="white">
      {oferta.turma.codigo_disc} ({oferta.turma.turma})
    </Text>
  </Box>
);

export { Item };
