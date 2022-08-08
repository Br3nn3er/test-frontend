import { PropsWithChildren } from 'react';

export type BaseProps = {
  loading?: boolean;
  title: string;
};

export type State = {
  show: boolean;
};

export type Props = PropsWithChildren<BaseProps>;
