import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { forwardRef, useCallback } from 'react';
import { RefCallBack } from 'react-hook-form';
import ReactSelect, { Props as SelectProps } from 'react-select';

import { Option, Props } from './types';

const SelectComponent = <T,>(
  {
    error,
    isClearable = true,
    isDisabled = false,
    isLoading = false,
    label,
    name,
    onBlur,
    onChange,
    options,
    placeholder,
    value,
  }: Props<T>,
  ref: RefCallBack,
) => {
  const onSelect = useCallback(
    (selected: Option<T>) => {
      if (selected) onChange(selected.value);
      else onChange(null);
    },
    [onChange],
  );

  const noOptionsMessage = useCallback<SelectProps['noOptionsMessage']>(
    () => <Text>Nenhum item encontrado</Text>,
    [],
  );

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ReactSelect
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        name={name}
        noOptionsMessage={noOptionsMessage}
        onBlur={onBlur}
        onChange={onSelect}
        options={options}
        placeholder={placeholder}
        ref={ref}
        styles={{
          control: provided => ({
            ...provided,
            borderColor: error ? 'var(--chakra-colors-red-500) !important' : '',
          }),
        }}
        value={value}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectComponent);
