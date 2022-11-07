import { Section, Div } from '../../shared';
import { CareerContainer, CareerTitle } from './careersStyles';

function CareerHero() {
  return (
    <Section bg={`var(--gray)`}>
      <Div>
        <CareerContainer>
          <CareerTitle>
            Join us to build the new wave of Buy now, Pay later!
          </CareerTitle>
        </CareerContainer>
      </Div>
    </Section>
  );
}

export default CareerHero;
