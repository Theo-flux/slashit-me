import Image from 'next/image';
import { Section, Div, Button, Title } from '../../../shared';
import { HeroContainer, InfoWrapper, Text, Row } from './cliqueHeroStyles';

function CliqueHero() {
  return (
    <Section>
      <Div>
        <HeroContainer>
          <InfoWrapper>
            <Title>Clique - where your friends got your back</Title>
            <Text color={`var(--violet)`}>
              Rock with friends the new-modern way!
            </Text>
            <Text>
              Invite your friends<sup>1</sup> to join your Clique<sup>2</sup> on
              the Slashit app and increase your Credit limit up to ₦150k
              <sup>3</sup> to shop or pay bills. No bank information required.
            </Text>
          </InfoWrapper>

          <InfoWrapper>
            <Image
              src="/images/clique-hero.svg"
              width={550}
              height={366}
              alt="clique-hero"
            />
          </InfoWrapper>
        </HeroContainer>
      </Div>
    </Section>
  );
}

export default CliqueHero;
