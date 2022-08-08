import { Skeleton, Tr, Td } from '@chakra-ui/react';
import { FC, Fragment, memo } from 'react';

import { Props } from './types';

const LoaderComponent: FC<Props> = ({ columns, lines }) => (
  <Fragment>
    {Array.from({ length: lines }).map((_, lineIndex) => (
      <Tr key={`l-${lineIndex}`}>
        {Array.from({ length: columns }).map((__, columnIndex) => (
          <Td key={`c-${columnIndex}`}>
            <Skeleton height="20px" />
          </Td>
        ))}
      </Tr>
    ))}
  </Fragment>
);

export const Loader = memo(LoaderComponent);
