import { PropsWithChildren } from 'react';

export interface BaseProps {
  title: string;
}

export type Props = PropsWithChildren<BaseProps>;
