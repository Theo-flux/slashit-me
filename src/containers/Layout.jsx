import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from '../components';
import { ProgressBar } from '../shared';

function Layout({ children }) {
  const loading = useSelector((state) => state.helper.loading);
  return (
    <div>
      <Head>
        <title>Slashit</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="author" content="" />
        <meta
          name="description"
          content="Buy now, Pay later with Slashit"
        />
        <link rel="icon" href="/images/slashit.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <main>
        <ProgressBar loading={loading} />
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
