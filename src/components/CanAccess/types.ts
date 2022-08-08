import { Props as LoggedPageProps } from '@components/LoggedPage/types';
import { PropsWithChildren } from 'react';

export enum Role {
  ADMIN = 'ADMIN',
}

type BaseProps = {
  userRole?: Role[];
};

export type Props = PropsWithChildren<BaseProps> & LoggedPageProps;
