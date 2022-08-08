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
import { Params } from '@components/Pages/Semestre/Editar/types';
import { Loader } from '@components/PageList/components/Loader';

import { useSemesterApi } from '@contexts/ApiContext';

import { SemesterRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

import { Semester } from '@models/Semester';

import { NavigationServiceInstance } from '@services/index';

import { Props } from './types';

const Table: FC<Props> = ({
  isFetched = false,
  loadinng = false,
  onRefresh,
  semesters = [],
}) => {
  const [selectedSemesterToDelete, setSelectedSemesterToDelete] =
    useState<Semester>();
  const { remove } = useSemesterApi();
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const confirmDeleteModal = useRef<ModalConfirm>();

  const showDeleteModal = useCallback(
    (semester: Semester) => {
      setSelectedSemesterToDelete(semester);
      confirmDeleteModal.current.show();
    },
    [setSelectedSemesterToDelete, confirmDeleteModal],
  );

  const onEdit = useCallback((id: number) => {
    const url = NavigationServiceInstance.parseRoute<Params>(
      SemesterRoute.EDIT,
      { id: id.toString() },
    );

    Router.push(url);
  }, []);

  const onDelete = useCallback(async () => {
    setDeleteLoading(true);

    try {
      await remove(selectedSemesterToDelete.id);

      toast({
        description: `Semestre "${selectedSemesterToDelete.id}" removido com sucesso`,
        duration: 5000,
        status: 'success',
        title: 'Sucesso',
      });

      onRefresh();
    } catch ({
      message = `Erro ao apagar o semestre "${selectedSemesterToDelete.id}", tente novamente mais tarde`,
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
  }, [onRefresh, remove, selectedSemesterToDelete, toast]);

  return (
    <TableContainer>
      <ModalConfirm
        loading={deleteLoading}
        onSuccess={onDelete}
        ref={confirmDeleteModal}
      >
        <Text>Deseja realmente apagar o semestre?</Text>
        <br />

        <Text display="flex">
          <Text fontWeight="bold">ID:</Text>&nbsp;
          <Text>{selectedSemesterToDelete?.id}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Ano:</Text>&nbsp;
          <Text>{selectedSemesterToDelete?.ano}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Semestre:</Text>&nbsp;
          <Text>{selectedSemesterToDelete?.semestre}</Text>
        </Text>

        <Text alignItems="center" display="flex">
          <Text fontWeight="bold">Ativo:</Text>&nbsp;
          {selectedSemesterToDelete?.status ? (
            <CheckIcon color="green" />
          ) : (
            <CloseIcon color="red" />
          )}
        </Text>
      </ModalConfirm>

      <ChackraTable colorScheme="whiteAlpha" variant="striped">
        <Thead>
          <Tr>
            <Th textAlign="center">ID</Th>
            <Th textAlign="center">Ano</Th>
            <Th textAlign="center">Semestre</Th>
            <Th textAlign="center">Ativo</Th>
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {loadinng && <Loader columns={5} lines={3} />}

          {isFetched && !semesters.length && (
            <Tr>
              <Td colSpan={5}>
                <Text color="gray" textAlign="center" fontSize="20px">
                  Nenhum semestre encontrado
                </Text>
              </Td>
            </Tr>
          )}

          {semesters.map(semester => (
            <Tr key={`semester-${semester.id}`}>
              <Td textAlign="center">{semester.id}</Td>
              <Td textAlign="center">{semester.ano}</Td>
              <Td textAlign="center">{semester.semestre}</Td>
              <Td px="6" textAlign="center">
                {semester.status ? (
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
                  onClick={() => onEdit(semester.id)}
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
                  onClick={() => showDeleteModal(semester)}
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
