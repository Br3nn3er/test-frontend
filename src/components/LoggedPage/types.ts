import { PropsWithChildren } from 'react';

export interface BaseProps {
  pageTitle: string;
  showHeader?: boolean;
  showSideBar?: boolean;
}

export type Props = PropsWithChildren<BaseProps>;
