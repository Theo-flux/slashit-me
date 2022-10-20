import { useEffect } from 'react';
import Image from 'next/image';
import { Section, Div, Title, Button } from '../../../shared';
import GeneratePaymentLink from '../generatePaymentLink';
import {
  PaymentContainer,
  InfoWrapper,
  Text,
  SmallText,
  EmojiHandSide,
  EmojiHandDown,
} from './paymentLinkStyles';

function PaymentLink() {
  let paymentLinkEl = '';

  if (typeof window !== 'undefined') {
    paymentLinkEl = window.document.getElementById('generate');
  }

  function handleFocus() {
    paymentLinkEl?.firstChild?.children[1]?.focus();
    paymentLinkEl?.firstChild?.children[1]?.lastChild?.focus();
  }

  return (
    <Section bg={`var(--link)`}>
      <Div>
        <PaymentContainer>
          <InfoWrapper>
            <Title>Payment links</Title>
            <SmallText>
              Get paid by anyone in installments without writing a line of code.
            </SmallText>

            <Text>
              Create a payment link, share it with anyone - they pay Slashit in
              installments over time and Slashit pays you now in full.
            </Text>

            <Button onClick={() => handleFocus()}>
              <EmojiHandSide>👈 </EmojiHandSide>
              <EmojiHandDown>👇</EmojiHandDown> Try it
            </Button>
          </InfoWrapper>
          <InfoWrapper>
            <GeneratePaymentLink id="generate" />
          </InfoWrapper>
        </PaymentContainer>
      </Div>
    </Section>
  );
}
export default PaymentLink;
