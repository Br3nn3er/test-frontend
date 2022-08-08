import { Box, Button } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { CanAccess } from '@components/CanAccess';
import { PageHeader } from '@components/PageHeader';
import { PageLoader } from '@components/PageLoader';
import { Wrapper } from '@components/Wrapper';

import { useRestricoesApi } from '@contexts/ApiContext';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Restricao as RestricaoModel } from '@models/Restricao';

import { Calendar } from './components/Calendar';
import { OnChange, OnUpdate } from './components/Calendar/types';
import { ListaRestricoes } from './components/ListaRestricoes';

const Restricao: FC = () => {
  const [restricoes, setRestricoes] = useState<RestricaoModel[]>([]);
  const [restricoesAtuais, setRestricoesAtuais] = useState<RestricaoModel[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const { bulkCreate, deleteAll, findAll } = useRestricoesApi();
  const { toast } = useToast();

  useDidMount(async () => {
    setLoading(true);

    try {
      const all = await findAll();

      all.sort((a, b) => parseInt(a.dia, 10) - parseInt(b.dia, 10));

      setRestricoes(all);
      setRestricoesAtuais(all);
    } catch ({
      message = 'Erro ao buscar restrições, tente novamente mais tarde',
    }) {
      toast({
        description: message,
        duration: 5000,
        status: 'error',
        title: 'Erro',
      });
    } finally {
      setLoading(false);
    }
  });

  const update = useCallback<OnUpdate>(
    async newRestricoes => {
      setUpdateLoading(true);

      try {
        await deleteAll();
        await bulkCreate(newRestricoes);

        newRestricoes.sort((a, b) => parseInt(a.dia, 10) - parseInt(b.dia, 10));
        setRestricoesAtuais(newRestricoes);

        toast({
          description: 'Restrições alteradas com sucesso',
          duration: 5000,
          status: 'success',
          title: 'Sucesso',
        });
      } catch ({
        message = 'Erro ao alterar restrições, tente novamente mais tarde',
      }) {
        toast({
          description: message,
          duration: 5000,
          status: 'error',
          title: 'Erro',
        });
      } finally {
        setUpdateLoading(false);
      }
    },
    [bulkCreate, deleteAll, toast],
  );

  const onChange = useCallback<OnChange>(r => setRestricoes(r), []);

  const save = useCallback(() => update(restricoes), [restricoes, update]);

  if (loading) {
    return (
      <PageLoader containerHeight="100%" text="Carregando restrições..." />
    );
  }

  return (
    <CanAccess pageTitle="Restrições">
      <Wrapper>
        <PageHeader
          title="Restrições"
          titleActions={
            <Button
              colorScheme="blue"
              onClick={save}
              isDisabled={updateLoading}
              isLoading={updateLoading}
              type="button"
            >
              Salvar alterações
            </Button>
          }
        />

        <Calendar restricoes={restricoes} onChange={onChange} />

        <Box mt={5}>
          <ListaRestricoes restricoes={restricoesAtuais} />
        </Box>
      </Wrapper>
    </CanAccess>
  );
};

export { Restricao };
