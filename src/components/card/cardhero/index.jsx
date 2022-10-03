import Image from 'next/image';
import { Section, Div, Title } from '../../../shared';
import { HeroContainer, InfoWrapper, Text } from './cardHeroStyles';

function CardHero() {
  return (
    <Section>
      <Div>
        <HeroContainer>
          <InfoWrapper>
            <Title>A new kind of virtual Card</Title>
            <Text>
              Fund with any amount<sup>1</sup>, pay 25% upfront of that amount
              and pay the rest over 6 weeks
            </Text>
          </InfoWrapper>
          <InfoWrapper>
            <Image
              src={'/images/virtual-cards.svg'}
              width={550}
              height={350}
              alt="virtual card"
            />
          </InfoWrapper>
        </HeroContainer>
      </Div>
    </Section>
  );
}
export default CardHero;
