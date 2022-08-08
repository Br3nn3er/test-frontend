import { SwitchProps } from '@chakra-ui/react';
import { Control, FieldError } from 'react-hook-form';

export interface Props extends SwitchProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  error?: FieldError;
}
