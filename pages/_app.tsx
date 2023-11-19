import { useEffect, ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next';
import { Router } from 'next/router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import styled, { ThemeProvider, css, keyframes } from 'styled-components';

import { QueryClientProvider } from 'react-query';

import { queryClient } from '../libs/reactQuery/reactQuery';

import { store } from '../stores/store';
import { useAppSelector } from '../stores/hooks';
import { selectIsInit } from '../stores/slices/colorThemeSlice';

// Components
import GlobalStyle from '../components/globalstyles';
import BackgroundTask from '../components/elements/BackgroundTask/BackgroundTask';

import { useColorTheme } from '../hooks/useColorTheme';
import LoadingOverlay from '../components/elements/common/LoadingOverlay/LoadingOverlay';

/**
 * Styles
 */

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.1;
  }
  40% {
    opacity: 0.3;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
`;

const FadeInDiv = styled.div`
  animation: ${fadeIn} 800ms ease-in-out forwards;

  ${({ isVisible }: { isVisible: boolean }) => !isVisible && css`
    opacity: 0;
  `}
`;

// Layout configuration doc
// https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  router: Router // Error if this property doesn't exist
};

/**
 *
 *
 * @param {AppPropsWithLayout} { Component, pageProps }
 * @return {*} JSX.Element
 */
const WithThemeProviderComponent = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { initColorTheme, getCurrentColorThemeStyle } = useColorTheme();
  const isInitColorTheme = useAppSelector(selectIsInit);

  useEffect(() => {
    initColorTheme();
  }, []);

  return (
    <FadeInDiv isVisible={isInitColorTheme}>
      {isInitColorTheme ? (
        <ThemeProvider theme={getCurrentColorThemeStyle()}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      ) : (
        <LoadingOverlay loading={!isInitColorTheme} />
      )}
    </FadeInDiv>
  );
};

const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BackgroundTask />
        {getLayout(
          <WithThemeProviderComponent
            Component={Component}
            pageProps={pageProps}
            router={router}
          />,
        )}
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
