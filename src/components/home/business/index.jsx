import { Section, Div, Button } from '../../../shared';
import {
  BusinessContainer,
  Tag,
  Text,
  Title,
  Wrapper,
  Img,
  LearnMoreMobile,
  LearnMoreDesktop,
  Container,
  Heading,
} from './businessStyle';

function Business() {
  return (
    <Section>
      <Div>
        <BusinessContainer>
          <Tag>Business</Tag>
          <Title>shop & pay in installments</Title>
          <Text>
            Let your customers shop & pay in installments. That equals more
            orders and happy customers, they will love you for it!
          </Text>

          <Wrapper>
            <Img src="/images/image-slider-1.png" alt="slide-1" />
            <Img src="/images/image-slider-2.png" alt="slide-1" />
            <Img src="/images/image-slider-3.png" alt="slide-1" />
          </Wrapper>

          <LearnMoreDesktop>
            <Button>Learn more</Button>
          </LearnMoreDesktop>

          <LearnMoreMobile>
            <Container>
              <Heading>Get paid the easy way</Heading>
              <Text color="white">
                Your customers pay in 4 or 3 installments and we pay you in full
                instantly - we’ve made friends with your customers already so
                that they can pay us back
              </Text>
              <Button type="outlined">Learn more</Button>
            </Container>
          </LearnMoreMobile>
        </BusinessContainer>
      </Div>
    </Section>
  );
}

export default Business;
