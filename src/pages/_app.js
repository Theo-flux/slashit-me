import Head from 'next/head';
import GlobalCSS from '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalCSS />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
