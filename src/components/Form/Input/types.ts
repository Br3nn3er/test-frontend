import { InputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export interface Props extends InputProps {
  name: string;
  label?: string;
  error?: FieldError;
}
