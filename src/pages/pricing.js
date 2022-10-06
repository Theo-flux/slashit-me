import Layout from '../containers/Layout';
import { Price, Footer, Download } from '../components';

export default function Pricing() {
  return (
    <Layout>
      <Price />
      <Download />
      <Footer>
        <p>
          <sup>1</sup> While BVN, bank statements, proof of employment or other
          Identification document is not a requirement to pay in installments
          with Slashit, a customer may be required by us to provide any of these
          documents if we detect that they may have abused the Slashit terms of
          use or installment agreement.
        </p>
      </Footer>
    </Layout>
  );
}
