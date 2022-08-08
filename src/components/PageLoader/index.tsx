import { Flex, Text, Spinner, Box } from '@chakra-ui/react';
import { FC } from 'react';

import { Props } from './types';

const PageLoader: FC<Props> = ({
  containerHeight = '100vh',
  text = 'Carregando Página',
}) => (
  <Flex
    alignItems="center"
    flexDirection="column"
    height={containerHeight}
    justifyContent="center"
  >
    <Box>
      <Spinner size="xl" />
    </Box>

    <Box my="6">
      <Text fontSize="30px">{text}</Text>
    </Box>
  </Flex>
);

export { PageLoader };
