import Image from 'next/image';
import { Section, Div, Title } from '../../../shared';
import {
  HowContainer,
  InfoWrapper,
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
} from './howStyles';

const steps = [
  {
    num: '1',
    title: 'Invite friend',
    text: 'Invite a friend to join your Clique on Slashit.',
  },

  {
    num: '2',
    title: 'Add debit card',
    text: 'Add a valid debit card to your account.',
  },

  {
    num: '3',
    title: 'Increase your Credit limit',
    text: 'You and your friend are now both eligible to increase your Credit limit and pay in installments with Slashit.',
  },
];

function HowItWorks() {
  return (
    <Section bg={`var(--link)`}>
      <Div>
        <HowContainer>
          <InfoWrapper>
            <Image
              src="/images/phone-mockup.svg"
              width={400}
              height={650}
              alt="slashit-mobile"
            />
          </InfoWrapper>

          <InfoWrapper>
            <Title>How it works</Title>
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
        </HowContainer>
      </Div>
    </Section>
  );
}

export default HowItWorks;
