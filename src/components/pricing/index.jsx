import { Section, Div } from '../../shared';
import {
  PriceContainer,
  Wrapper,
  Tag,
  StyledTitle,
  StyledText,
  StyledType,
} from './priceStyles';

function Price() {
  return (
    <Section>
      <Div>
        <PriceContainer>
          <Wrapper>
            <Tag>Flexible Pricing to help your business grow</Tag>
            <StyledTitle>
              Sell without <StyledType>barrier</StyledType>
            </StyledTitle>
            <StyledText>
              Let your customers buy what they want and pay in 4 or 3
              installments. They don’t need their bank account information or a
              proof of credit to pay1 and you’ll get your money in full.
            </StyledText>
          </Wrapper>
        </PriceContainer>
      </Div>
    </Section>
  );
}

export { Price };
