import { Global } from '@emotion/react';

import type { AppProps } from 'next/app';

import globals from '../styles/globals';

import wrapper from '../store';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globals} />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
