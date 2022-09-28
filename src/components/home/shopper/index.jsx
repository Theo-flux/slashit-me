import React from 'react';
import { Section, Div, Title, Button } from '../../../shared';
import {
  ShopperContainer,
  Tag,
  Text,
  Wrapper,
  Top,
  Bottom,
  Line,
  NumberWrapper,
  Num,
  StepCard,
} from './shopperStyle';

const nums = ['1', '2', '3'];

const steps = [
  {
    title: 'Invite friend',
    text: 'Invite a friend to join your Clique on Slashit.',
  },

  {
    title: 'Add debit card',
    text: 'Add a valid debit card to your account.',
  },

  {
    title: 'Increase your Credit limit',
    text: 'You and your friend are now both eligible to increase your Credit limit and pay in installments with Slashit.',
  },
];

function Shopper() {
  return (
    <Section bg={`var(--link)`}>
      <Div>
        <ShopperContainer>
          <Tag>Shopper</Tag>
          <Title>Bring your friends</Title>
          <Text>
            We take away all the drama so that anyone can pay in installments by
            inviting a friend and adding a debit card to their Slashit account -
            PERIOD!
          </Text>

          <Wrapper>
            <Top>
              <Line></Line>
              <NumberWrapper>
                {nums.map((num, index) => {
                  return (
                    <Num key={index}>
                      <div>
                        <span>{num}</span>
                      </div>
                    </Num>
                  );
                })}
              </NumberWrapper>
            </Top>

            <Bottom>
              {steps.map((step, index) => {
                const { title, text } = step;
                return (
                  <StepCard key={index}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </StepCard>
                );
              })}
            </Bottom>
          </Wrapper>

          <Button>Learn more</Button>
        </ShopperContainer>
      </Div>
    </Section>
  );
}

export default Shopper;
