import Head from 'next/head';
import GlobalCSS from '../styles/globals.css';
import ENV from './../../env';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useEffect } from 'react';
import { FetchUserById } from '../api/userAPI';

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: `${ENV.REACT_APP_GRAPHQL_ENDPOINT}`,
    cache: new InMemoryCache(),
  });

  const fetchUser = async () => {
    const fetchData = await FetchUserById();
    if (fetchData.success) {
      console.log(fetchData.user);
    } else {
      console.log(fetchData);
    }
    return;
  };

  useEffect(() => {
    fetchUser();
  },[]);


  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <GlobalCSS />
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default MyApp;
