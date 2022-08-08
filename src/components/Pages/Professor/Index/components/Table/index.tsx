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
} from '@chakra-ui/react';
import Router from 'next/router';
import { FC, useCallback, useRef, useState } from 'react';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';

import { ModalConfirm } from '@components/ModalConfirm';
import { Params } from '@components/Pages/Professor/Editar/types';
import { Loader } from '@components/PageList/components/Loader';

import { useTeacherApi } from '@contexts/ApiContext';

import { TeacherRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

import { Teacher } from '@models/Teacher';

import { NavigationServiceInstance } from '@services/index';

import { Props } from './types';

const Table: FC<Props> = ({
  teachers = [],
  isFetched = false,
  loadinng = false,
  onRefresh,
}) => {
  const [selectedTeacherToDelete, setSelectedTeacherToDelete] =
    useState<Teacher>();
  const { remove } = useTeacherApi();
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const confirmDeleteModal = useRef<ModalConfirm>();

  const showDeleteModal = useCallback(
    (teacher: Teacher) => {
      setSelectedTeacherToDelete(teacher);
      confirmDeleteModal.current.show();
    },
    [setSelectedTeacherToDelete, confirmDeleteModal],
  );

  const onEdit = useCallback((siape: string) => {
    const url = NavigationServiceInstance.parseRoute<Params>(
      TeacherRoute.EDIT,
      { siape },
    );

    Router.push(url);
  }, []);

  const onDelete = useCallback(async () => {
    setDeleteLoading(true);

    try {
      await remove(selectedTeacherToDelete.siape);

      toast({
        description: `Professor "${selectedTeacherToDelete.siape}" removido com sucesso`,
        duration: 5000,
        status: 'success',
        title: 'Sucesso',
      });

      onRefresh();
    } catch ({
      message = `Erro ao apagar o professor "${selectedTeacherToDelete.siape}", tente novamente mais tarde`,
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
  }, [onRefresh, remove, selectedTeacherToDelete, toast]);

  return (
    <TableContainer>
      <ModalConfirm
        loading={deleteLoading}
        onSuccess={onDelete}
        ref={confirmDeleteModal}
      >
        <Text>Deseja realmente apagar o professor?</Text>
        <br />

        <Text display="flex">
          <Text fontWeight="bold">Siape:</Text>&nbsp;
          <Text>{selectedTeacherToDelete?.siape}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Nome:</Text>&nbsp;
          <Text>{selectedTeacherToDelete?.nome}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Regime:</Text>&nbsp;
          <Text>{selectedTeacherToDelete?.regime}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Status:</Text>&nbsp;
          <Text>{selectedTeacherToDelete?.status}</Text>
        </Text>
      </ModalConfirm>

      <ChackraTable colorScheme="whiteAlpha" variant="striped">
        <Thead>
          <Tr>
            <Th textAlign="center">Siape</Th>
            <Th textAlign="center">Nome</Th>
            <Th textAlign="center">Status</Th>
            <Th textAlign="center">Afastado</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {loadinng && <Loader columns={5} lines={3} />}

          {isFetched && !teachers.length && (
            <Tr>
              <Td colSpan={5}>
                <Text color="gray" textAlign="center" fontSize="20px">
                  Nenhum professor encontrado
                </Text>
              </Td>
            </Tr>
          )}

          {teachers.map(teacher => (
            <Tr key={`teacher-${teacher.siape}`}>
              <Td textAlign="center">{teacher.siape}</Td>
              <Td textAlign="center">{teacher.nome}</Td>
              <Td textAlign="center">{teacher.status}</Td>
              <Td px="6" textAlign="center">
                {teacher.afastado ? (
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
                  onClick={() => onEdit(teacher.siape)}
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
                  onClick={() => showDeleteModal(teacher)}
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
