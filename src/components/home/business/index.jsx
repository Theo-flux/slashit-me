import { Section, Div, Button } from '../../../shared';
import {
  BusinessContainer,
  Tag,
  Text,
  Title,
  Wrapper,
  Img,
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

          <Button>Learn more</Button>
        </BusinessContainer>
      </Div>
    </Section>
  );
}

export default Business;
