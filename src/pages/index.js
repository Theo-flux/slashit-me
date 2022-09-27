import Head from 'next/head';
import Image from 'next/image';
import Layout from '../containers/Layout';
import { Shopper } from '../components';

export default function Home() {
  return (
    <Layout>
      <Shopper />
    </Layout>
  );
}
