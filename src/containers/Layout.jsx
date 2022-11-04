import Head from 'next/head';
import React from 'react';
import { Navbar } from '../components';

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
          content="Slashit | Buy now, Pay later without the stress"
        />
        <link rel="icon" href="/images/slashit.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
