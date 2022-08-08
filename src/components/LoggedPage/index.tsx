import { Box, Container, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Router from 'next/router';
import { FC, Fragment, useCallback } from 'react';

import { Sidebar } from '@components/Sidebar';
import { Header } from '@components/Header';

import { RefreshPageInstance } from '@events/index';
import { Value } from '@events/RefreshPage/types';

import { useDidMount } from '@hooks/UseDidMount';
import { useToast } from '@hooks/useToast';

import { Props } from './types';

const LoggedPage: FC<Props> = ({
  children,
  pageTitle,
  showHeader = true,
  showSideBar = true,
}) => {
  const { toast } = useToast();

  const eventFn = useCallback((event: CustomEvent<Value>) => {
    if (event.detail.status) {
      toast({
        description: 'Atualizando token...',
        duration: 5000,
        id: 'TOKEN_REFRESH',
        status: 'warning',
        title: 'Token expirado',
      });

      setTimeout(() => Router.reload(), 700);
    }
  }, []);

  useDidMount(() => {
    RefreshPageInstance.once(eventFn);
  });

  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      {showHeader && <Header />}

      <Container maxWidth="8xl">
        <Flex width="100%" marginX="auto">
          {showSideBar && (
            <Box>
              <Sidebar />
            </Box>
          )}

          <Box flex="1" maxWidth="100%" overflow="auto">
            {children}
          </Box>
        </Flex>
      </Container>
    </Fragment>
  );
};

export { LoggedPage };
