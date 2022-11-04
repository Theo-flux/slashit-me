import Layout from '../containers/Layout';
import { CliqueHero, HowItWorks, Footer, Download } from '../components';

export default function Clique() {
  return (
    <Layout>
      <CliqueHero />
      <HowItWorks />
      <Download />
      <Footer>
        <p>
          <sup>1</sup> Friends here means people you have a very close
          relationship with.
        </p>

        <p>
          <sup>2</sup> Clique is where the friends you add appear on the Slashit
          app. Here you can remove a friend, add new friends and get
          insights into how your friends are getting ahead of repayments on
          their accounts.
        </p>

        <p>
          <sup>3</sup> Maintain a minimum Spending balance NGN15,000 for at
          least 15 days and you’ll be eligible to increase your Credit limit to
          NGN5,000 everyday if you continue to maintain a minimum Spending
          balance of NGN15,000. However, you might not be able to increase your
          Credit limit even if you’ve satisfied the conditions above if you or
          the friends in your Clique have a total debt that is more than
          NGN50,000.
        </p>
      </Footer>
    </Layout>
  );
}
