import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Icon,
  Table as ChackraTable,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Box,
} from '@chakra-ui/react';
import Router from 'next/router';
import { FC, useCallback, useRef, useState } from 'react';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';

import { ModalConfirm } from '@components/ModalConfirm';
import { Params } from '@components/Pages/Usuario/Editar/types';
import { Loader } from '@components/PageList/components/Loader';

import { useUserApi } from '@contexts/ApiContext';

import { UserRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

import { User } from '@models/User';

import { NavigationServiceInstance } from '@services/index';

import { Props } from './types';

const Table: FC<Props> = ({
  isFetched = false,
  loadinng = false,
  onRefresh,
  users = [],
}) => {
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User>();
  const { remove } = useUserApi();
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const confirmDeleteModal = useRef<ModalConfirm>();

  const showDeleteModal = useCallback(
    (user: User) => {
      setSelectedUserToDelete(user);
      confirmDeleteModal.current.show();
    },
    [setSelectedUserToDelete, confirmDeleteModal],
  );

  const onEdit = useCallback((id: string) => {
    const url = NavigationServiceInstance.parseRoute<Params>(UserRoute.EDIT, {
      id,
    });
    Router.push(url);
  }, []);

  const onDelete = useCallback(async () => {
    setDeleteLoading(true);

    try {
      await remove(selectedUserToDelete.id);

      toast({
        description: `Usuário "${selectedUserToDelete.id}" removido com sucesso`,
        duration: 5000,
        status: 'success',
        title: 'Sucesso',
      });

      onRefresh();
    } catch ({
      message = `Erro ao apagar o usuárioo "${selectedUserToDelete.id}", tente novamente mais tarde`,
    }) {
      toast({
        description: message,
        duration: 5000,
        status: 'error',
        title: 'Erro',
      });

      setDeleteLoading(false);
    } finally {
      confirmDeleteModal.current.hide();
    }
  }, [onRefresh, remove, selectedUserToDelete, toast]);

  return (
    <TableContainer>
      <ModalConfirm
        loading={deleteLoading}
        onSuccess={onDelete}
        ref={confirmDeleteModal}
      >
        <Text>Deseja realmente apagar o usuário?</Text>
        <br />

        <Box display="flex">
          <Text fontWeight="bold">ID:</Text>&nbsp;
          <Text>{selectedUserToDelete?.id}</Text>
        </Box>

        <Box display="flex">
          <Text fontWeight="bold">Nome:</Text>&nbsp;
          <Text>{selectedUserToDelete?.name}</Text>
        </Box>

        <Box display="flex">
          <Text fontWeight="bold">E-mail:</Text>&nbsp;
          <Text>{selectedUserToDelete?.email}</Text>
        </Box>

        <Box alignItems="center" display="flex">
          <Text fontWeight="bold">É admin:</Text>&nbsp;
          {selectedUserToDelete?.isAdmin ? (
            <CheckIcon color="green" />
          ) : (
            <CloseIcon color="red" />
          )}
        </Box>
      </ModalConfirm>

      <ChackraTable colorScheme="whiteAlpha" variant="striped">
        <Thead>
          <Tr>
            <Th textAlign="center">ID</Th>
            <Th textAlign="center">Nome</Th>
            <Th textAlign="center">E-mail</Th>
            <Th textAlign="center">É Admin</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {loadinng && <Loader columns={5} lines={3} />}

          {isFetched && !users.length && (
            <Tr>
              <Td colSpan={5}>
                <Text color="gray" textAlign="center" fontSize="20px">
                  Nenhum usuário encontrado
                </Text>
              </Td>
            </Tr>
          )}

          {users.map(user => (
            <Tr key={`semester-${user.id}`}>
              <Td textAlign="center">{user.id}</Td>
              <Td textAlign="center">{user.name}</Td>
              <Td textAlign="center">{user.email}</Td>
              <Td px="6" textAlign="center">
                {user.isAdmin ? (
                  <CheckIcon color="green" />
                ) : (
                  <CloseIcon color="red" />
                )}
              </Td>

              <Td textAlign="center">
                <Button
                  as="a"
                  colorScheme="teal"
                  cursor="pointer"
                  fontSize="sm"
                  onClick={() => onEdit(user.id)}
                  mr="10px"
                  size="sm"
                  textAlign="center"
                >
                  <Icon as={RiPencilLine} fontSize="16" />
                </Button>

                <Button
                  as="a"
                  colorScheme="red"
                  cursor="pointer"
                  fontSize="sm"
                  onClick={() => showDeleteModal(user)}
                  size="sm"
                  textAlign="center"
                >
                  <Icon as={RiDeleteBin6Line} fontSize="16" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChackraTable>
    </TableContainer>
  );
};

export { Table };
