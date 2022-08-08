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
import { Params } from '@components/Pages/Disciplina/Editar/types';
import { Loader } from '@components/PageList/components/Loader';

import { useDisciplineApi } from '@contexts/ApiContext';

import { DisciplineRoute } from '@enums/Route';

import { useToast } from '@hooks/useToast';

import { Discipline } from '@models/Discipline';

import { NavigationServiceInstance } from '@services/index';

import { Props } from './types';

const Table: FC<Props> = ({
  disciplines = [],
  isFetched = false,
  loading = false,
  onRefresh,
}) => {
  const [selectedDisciplineToDelete, setSelectedDisciplineToDelete] =
    useState<Discipline>();
  const { remove } = useDisciplineApi();
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const confirmDeleteModal = useRef<ModalConfirm>();

  const showDeleteModal = useCallback(
    (discipline: Discipline) => {
      setSelectedDisciplineToDelete(discipline);
      confirmDeleteModal.current.show();
    },
    [setSelectedDisciplineToDelete, confirmDeleteModal],
  );

  const onEdit = useCallback((code: string) => {
    const url = NavigationServiceInstance.parseRoute<Params>(
      DisciplineRoute.EDIT,
      { code },
    );

    Router.push(url);
  }, []);

  const onDelete = useCallback(async () => {
    setDeleteLoading(true);

    try {
      await remove(selectedDisciplineToDelete.codigo);

      toast({
        description: `Disciplina "${selectedDisciplineToDelete.codigo}" removido com sucesso`,
        duration: 5000,
        status: 'success',
        title: 'Sucesso',
      });

      onRefresh();
    } catch ({
      message = `Erro ao apagar a disciplina "${selectedDisciplineToDelete.codigo}", tente novamente mais tarde`,
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
  }, [onRefresh, remove, selectedDisciplineToDelete, toast]);

  return (
    <TableContainer>
      <ModalConfirm
        loading={deleteLoading}
        onSuccess={onDelete}
        ref={confirmDeleteModal}
      >
        <Text>Deseja realmente apagar a disciplina?</Text>
        <br />

        <Text display="flex">
          <Text fontWeight="bold">Código:</Text>&nbsp;
          <Text>{selectedDisciplineToDelete?.codigo}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Código Antigo:</Text>&nbsp;
          <Text>{selectedDisciplineToDelete?.cod_antigo}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Nome:</Text>&nbsp;
          <Text>{selectedDisciplineToDelete?.nome}</Text>
        </Text>

        <Text display="flex">
          <Text fontWeight="bold">Curso:</Text>&nbsp;
          <Text>{selectedDisciplineToDelete?.curso}</Text>
        </Text>
      </ModalConfirm>

      <ChackraTable colorScheme="whiteAlpha" variant="striped">
        <Thead>
          <Tr>
            <Th textAlign="center">Código</Th>
            <Th textAlign="center">Código Antigo</Th>
            <Th textAlign="center">Nome</Th>
            <Th textAlign="center">Curso</Th>
            <Th textAlign="center">Carga Teórica</Th>
            <Th textAlign="center">Carga Prática</Th>
            <Th textAlign="center">Carga Total</Th>
            <Th textAlign="center">Período</Th>
            <Th textAlign="center">Fila</Th>

            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {loading && <Loader columns={10} lines={3} />}

          {isFetched && !disciplines.length && (
            <Tr>
              <Td colSpan={10}>
                <Text color="gray" textAlign="center" fontSize="20px">
                  Nenhuma disciplina encontrada
                </Text>
              </Td>
            </Tr>
          )}

          {disciplines.map(discipline => (
            <Tr key={`course-${discipline.codigo}`}>
              <Td textAlign="center">{discipline.codigo}</Td>
              <Td textAlign="center">{discipline.cod_antigo}</Td>
              <Td textAlign="center">{discipline.nome}</Td>
              <Td textAlign="center">{discipline.curso}</Td>

              <Td textAlign="center" isNumeric>
                {discipline.ch_teorica}
              </Td>

              <Td textAlign="center" isNumeric>
                {discipline.ch_pratica}
              </Td>

              <Td textAlign="center" isNumeric>
                {discipline.ch_total}
              </Td>

              <Td textAlign="center" isNumeric>
                {discipline.periodo}
              </Td>

              <Td px="6" textAlign="center">
                {discipline.temfila ? (
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
                  onClick={() => onEdit(discipline.codigo)}
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
                  onClick={() => showDeleteModal(discipline)}
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
