import Layout from '../containers/Layout';
import { Business, Hero, Shopper, Footer } from '../components';
import { Toast } from '../shared';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Shopper />
      <Business />
      <Footer>
        <p>
          <sup>1</sup> When you pay anyone on Slashit they need a Slashit
          business account to claim the funds, they can sign up for a Slashit
          business account free of charge.
        </p>
      </Footer>
    </Layout>
  );
}
