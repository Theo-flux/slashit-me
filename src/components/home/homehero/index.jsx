import React from 'react';
import { Section, Div, Title, Button } from '../../../shared';
import { HeroContainer, Text, InfoWrapper, Row, Clipper } from './heroStyles';
import Pay from '../../pay';

function Hero() {
  return (
    <Section>
      <Div>
        <HeroContainer>
          <InfoWrapper>
            <Title>
              Buy now, pay later without the <Clipper>stress</Clipper>
            </Title>
            <Text>
              Get the money to shop, pay bills or pay anyone<sup>1</sup> and
              conveniently repay over 6 weeks or 3 months.
            </Text>
            <br />
            <Text>
              No proof of credit! No bank information! No boring documentation!
            </Text>

            <Row>
              <Button>Pay anyone</Button>
              <Button type="outlined">Get Paid</Button>
            </Row>
          </InfoWrapper>

          <InfoWrapper>
            <Pay />
          </InfoWrapper>
        </HeroContainer>
      </Div>
    </Section>
  );
}

export default Hero;
