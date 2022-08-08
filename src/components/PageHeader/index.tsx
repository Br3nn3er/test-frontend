import { Heading, Flex } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { Props } from './types';

const PageHeaderComponent: FC<Props> = ({ title, titleActions }) => (
  <Flex mb="8" justify="space-between" align="center">
    <Heading size="lg" fontWeight="normal">
      {title}
    </Heading>
    <Flex alignItems="center" flex={1} justifyContent="right">
      {titleActions}
    </Flex>
  </Flex>
);

export const PageHeader = memo(PageHeaderComponent);
