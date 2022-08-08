import { SelectProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface Props extends SelectProps {
  name: string;
  label?: string;
  error?: FieldError;
}
