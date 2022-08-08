import { CSSProperties, PropsWithChildren } from 'react';

interface BaseProps {
  style?: CSSProperties;
}

export type Props = PropsWithChildren<BaseProps>;
