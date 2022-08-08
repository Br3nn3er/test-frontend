import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  CSSObject,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import { Props } from './types';

const hoverStyle: CSSObject = { bgColor: 'gray.200' };

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, error, ...rest },
  ref,
) => (
  <FormControl isInvalid={!!error}>
    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

    <ChakraInput
      _hover={hoverStyle}
      bgColor="gray.100"
      focusBorderColor="blue.500"
      id={name}
      name={name}
      ref={ref}
      size="lg"
      variant="filled"
      {...rest}
    />

    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
);

export const Input = forwardRef(InputBase);
