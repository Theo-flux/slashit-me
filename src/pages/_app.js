// import '../styles/globals.css';
import GlobalCSS from '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalCSS />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
