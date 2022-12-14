import { Provider } from 'react-redux';

import { Global } from '@emotion/react';

import type { AppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import globals from '../styles/globals';

import wrapper from '../store';

config.autoAddCss = false;

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Global styles={globals} />
      <Component {...props.pageProps} />
    </Provider>
  );
}
