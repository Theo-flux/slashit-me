import { useState } from 'react';
import { Section, Div } from '../../shared';
import { FaqWrapper, FaqCol, FaqRow, FaqTitle, FaqPod } from './faqStyles';
import CliqueFaq from './cliqueFaq';
import CardFaq from './cardFaq';
import MerchantFaq from './merchantFaq';

function Faq() {
  const [activeFaq, setActivefaq] = useState('clique');

  function handleActiveFaq(arg) {
    setActivefaq(arg);
  }

  return (
    <Section>
      <Div>
        <FaqWrapper>
          <FaqCol>
            <FaqTitle>Frequently Asked Questions</FaqTitle>
          </FaqCol>

          <FaqCol>
            <FaqRow>
              <FaqPod
                active={activeFaq}
                type={'clique'}
                onClick={() => handleActiveFaq('clique')}
              >
                Clique
              </FaqPod>
              <FaqPod
                active={activeFaq}
                type={'card'}
                onClick={() => handleActiveFaq('card')}
              >
                Card
              </FaqPod>
              <FaqPod
                active={activeFaq}
                type={'merchant'}
                onClick={() => handleActiveFaq('merchant')}
              >
                Merchant
              </FaqPod>
            </FaqRow>
          </FaqCol>
        </FaqWrapper>
      </Div>
    </Section>
  );
}

export default Faq;
