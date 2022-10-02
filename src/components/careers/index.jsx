import { Section, Div } from '../../shared';
import { CareerContainer, CareerTitle } from './careersStyles';

function CareerHero() {
  return (
    <Section bg={`black`}>
      <Div>
        <CareerContainer>
          <CareerTitle>
            Join us to build access to credit for millions who typically don’t
            qualify!
          </CareerTitle>
        </CareerContainer>
      </Div>
    </Section>
  );
}

export default CareerHero;
