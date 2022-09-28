import Layout from '../containers/Layout';
import { Business, Hero, Shopper } from '../components';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Shopper />
      <Business />
    </Layout>
  );
}
