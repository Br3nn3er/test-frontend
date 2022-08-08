import { Button, Icon, Stack } from '@chakra-ui/react';
import { PageHeader } from '@components/PageHeader';
import { FC, memo } from 'react';
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri';

import { Props } from './types';

const PageListHeaderComponent: FC<Props> = ({ onCreate, onDelete, title }) => (
  <PageHeader
    title={title}
    titleActions={
      <Stack direction="row">
        {!!onDelete && (
          <Button
            as="a"
            colorScheme="red"
            cursor="pointer"
            fontSize="sm"
            leftIcon={<Icon as={RiDeleteBinLine} fontSize="20" />}
            onClick={onDelete}
            size="sm"
          >
            Deletar
          </Button>
        )}

        {!!onCreate && (
          <Button
            as="a"
            colorScheme="blue"
            cursor="pointer"
            fontSize="sm"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            onClick={onCreate}
            size="sm"
          >
            Criar novo
          </Button>
        )}
      </Stack>
    }
  />
);

export const PageListHeader = memo(PageListHeaderComponent);
