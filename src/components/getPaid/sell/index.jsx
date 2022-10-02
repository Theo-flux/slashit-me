import Image from 'next/image';
import { Section, Div, Title } from '../../../shared';
import {
  SellContainer,
  InfoWrapper,
  Text,
  SmallText,
  StyledContent,
  Line,
} from './sellStyles';

function Sell() {
  return (
    <Section bg={`var(--link)`}>
      <Div>
        <SellContainer>
          <InfoWrapper>
            <Title>Sell more with Confidence</Title>
            <SmallText>Want more sales?</SmallText>

            <StyledContent>
              <Line />
              <Text>
                Hit your revenue target with a payment method that lets your
                customers pay conveniently over time.
              </Text>
              <Line />
            </StyledContent>
          </InfoWrapper>
          <InfoWrapper>
            <Image
              src={'/images/price-tag.svg'}
              width={550}
              height={350}
              alt="virtual card"
            />
          </InfoWrapper>
        </SellContainer>
      </Div>
    </Section>
  );
}
export default Sell;
