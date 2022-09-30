import Image from 'next/image';
import { Section, Div } from '../../../shared';
import {
  CreditContainer,
  InfoWrapper,
  Title,
  Text,
  Bottom,
  Line,
  Step,
  Innner,
  StepCard,
  NumDiv,
  Num,
  Info,
  InfoTitle,
  InfoDescription,
} from './oncreditStyles';

const steps = [
  {
    num: '1',
    title: 'Order',
    text: 'Your customer would want to place their order as usual - by making the payments in full.',
  },

  {
    num: '2',
    title: 'Pay with Slashit',
    text: 'Create a payment link and share it with them to pay in 4 or 3 installments with Slashit instead.',
  },

  {
    num: '3',
    title: 'Instant payout',
    text: 'We pay the total amount of the order to your bank account 1 instantly and your customer can get their order.',
  },
];

function OnCredit() {
  return (
    <Section bg={`var(--link)`}>
      <Div>
        <CreditContainer>
          <InfoWrapper>
            <Title>Your customers can buy on credit</Title>
            <Text>Better life for them, more sales for you.</Text>
          </InfoWrapper>

          <InfoWrapper>
            <Bottom>
              <Step>
                <Line></Line>

                <Innner>
                  {steps.map((step, index) => {
                    const { num, title, text } = step;
                    return (
                      <StepCard key={index}>
                        <NumDiv>
                          <Num>{num}</Num>
                        </NumDiv>
                        <Info>
                          <InfoTitle>{title}</InfoTitle>
                          <InfoDescription>{text}</InfoDescription>
                        </Info>
                      </StepCard>
                    );
                  })}
                </Innner>
              </Step>
            </Bottom>
          </InfoWrapper>
        </CreditContainer>
      </Div>
    </Section>
  );
}

export default OnCredit;
