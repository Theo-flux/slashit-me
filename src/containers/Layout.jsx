import Head from 'next/head';
import React from 'react';
import { Navbar, Footer } from '../components';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>slashit</title>
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
      </Head>

      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
