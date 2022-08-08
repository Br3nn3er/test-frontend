import { LinkProps } from '@chakra-ui/react';
import { ElementType } from 'react';

export interface Props extends LinkProps {
  href: string;
  icon: ElementType;
}
