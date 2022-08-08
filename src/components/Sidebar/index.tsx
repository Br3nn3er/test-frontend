import { Box } from '@chakra-ui/react';
import { FC } from 'react';

import { SidebarNav } from './components/SidebarNav';

const Sidebar: FC = () => (
  <Box as="aside" width="64" mr="8">
    <SidebarNav />
  </Box>
);

export { Sidebar };
