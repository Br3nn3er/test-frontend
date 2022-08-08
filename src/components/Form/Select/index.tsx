import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Select as ChakraSelect,
  CSSObject,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import { Props } from './types';

const hoverStyle: CSSObject = { bgColor: 'gray.200' };

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  { children, name, label, error, ...rest },
  ref,
) => (
  <FormControl isInvalid={!!error}>
    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

    <ChakraSelect
      _hover={hoverStyle}
      bgColor="gray.100"
      focusBorderColor="blue.500"
      id={name}
      name={name}
      ref={ref}
      size="lg"
      variant="filled"
      {...rest}
    >
      {children}
    </ChakraSelect>

    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
);

export const Select = forwardRef(SelectBase);
