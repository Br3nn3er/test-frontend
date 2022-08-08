import { PropsWithChildren } from 'react';

export interface BaseProps {
  loading?: boolean;
  onSuccess: () => void | Promise<void>;
  title?: string;
}

export type State = {
  show: boolean;
};

export type Props = PropsWithChildren<BaseProps>;
