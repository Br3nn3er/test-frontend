import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, Fragment } from 'react';

import { ApiProvider } from '@contexts/ApiContext';
import { AuthProvider } from '@contexts/AuthContext';
import { CookieProvider } from '@contexts/CookieContext';

import '@components/Pages/Disciplina/Horario/components/Calendar/style.css';

import { theme } from '@styles/theme';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <ChakraProvider theme={theme}>
      <CookieProvider>
        <ApiProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ApiProvider>
      </CookieProvider>
    </ChakraProvider>
  </Fragment>
);

export default App;
