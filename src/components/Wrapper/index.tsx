import { Box as ChakraUIBox } from '@chakra-ui/react';
import { CSSProperties, FC } from 'react';

import { Props } from './types';

const WrapperStyle: CSSProperties = {
  maxHeight: 'calc(100vh - 83.5px - 40px)',
  overflow: 'auto',
};

const Wrapper: FC<Props> = ({ children, style = {} }) => (
  <ChakraUIBox
    style={{ ...WrapperStyle, ...style }}
    bg="#FFFFFF"
    borderRadius="8"
    flex="1"
    p="8"
  >
    {children}
  </ChakraUIBox>
);

export { Wrapper };
