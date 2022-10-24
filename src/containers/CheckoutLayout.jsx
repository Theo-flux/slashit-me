import Head from 'next/head';
import CheckoutCmpt from '../components/checkout/cmpt/Cmpt';

function CheckoutLayout() {
  return (
    <div>
      <Head>
        <title>slashit - checkout</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="author" content="" />
        <meta
          name="description"
          content="Slashit is an online ecommerce site"
        />
        <link rel="icon" href="/images/slashit.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <main>
        <CheckoutCmpt />
      </main>
    </div>
  );
}

export default CheckoutLayout;
