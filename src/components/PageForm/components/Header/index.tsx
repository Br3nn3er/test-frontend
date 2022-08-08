import { Divider, Heading } from '@chakra-ui/react';
import { FC, Fragment, memo } from 'react';

import { Props } from './types';

const PageFormHeaderComponent: FC<Props> = ({ title }) => (
  <Fragment>
    <Heading size="md" fontWeight="normal">
      {title}
    </Heading>

    <Divider my="6" borderColor="gray.700" />
  </Fragment>
);

export const PageFormHeader = memo(PageFormHeaderComponent);
