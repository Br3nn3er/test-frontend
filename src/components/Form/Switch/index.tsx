import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch as ChakraSwitch,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Controller } from 'react-hook-form';

import { Props } from './types';

const SwitchBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { control, name, label, error, onChange: baseOnChange, isDisabled },
  ref,
) => (
  <FormControl isInvalid={!!error}>
    <Box alignItems="center" display="flex">
      {!!label && (
        <FormLabel htmlFor={name} mb={0}>
          {label}
        </FormLabel>
      )}

      <Controller
        control={control}
        defaultValue={false}
        name={name}
        render={({ field: { onChange, value } }) => (
          <ChakraSwitch
            id={name}
            ref={ref}
            size="lg"
            onChange={e => {
              onChange(e);
              if (baseOnChange) baseOnChange(e);
            }}
            variant="filled"
            isChecked={value}
            disabled={isDisabled}
          />
        )}
      />
    </Box>

    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>
);

export const Switch = forwardRef(SwitchBase);
