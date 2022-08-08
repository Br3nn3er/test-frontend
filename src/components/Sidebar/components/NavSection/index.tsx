import { Box, Text, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { Props } from './types';

const NavSection: FC<Props> = ({ children, title }) => (
  <Box>
    <Text color="gray.600" fontSize="small" fontWeight="bold">
      {title}
    </Text>

    <Stack align="stretch" marginTop="8" spacing="4">
      {children}
    </Stack>
  </Box>
);

export { NavSection };
