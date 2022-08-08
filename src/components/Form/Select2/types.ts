import { FocusEventHandler } from 'react';
import { FieldError } from 'react-hook-form';
import { GroupBase, OptionsOrGroups } from 'react-select';

export interface Props<T> {
  error?: FieldError;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: OnChange<T>;
  options: OptionsOrGroups<Option<T>, GroupBase<Option<T>>>;
  placeholder?: string;
  value?: Option<T>;
}

export interface Option<T> {
  label: string;
  value: T;
}

export type OnChange<T> = (value: T) => void;
