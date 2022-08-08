import { LinkProps } from 'next/link';
import { ReactElement } from 'react';

export interface Props extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}
