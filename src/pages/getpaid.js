import Layout from '../containers/Layout';
import { Banner, Footer, Download } from '../components';

export default function Clique() {
  return (
    <Layout>
      <Banner />
      <Download />
      <Footer>
        <p>
          <sup>1</sup> Merchants that have an active Slashit Thrive Subscription
          will get instant payouts to their bank accounts while Merchants on the
          Free Plan will get instant payouts in their Slashit Available Balance
        </p>
      </Footer>
    </Layout>
  );
}
