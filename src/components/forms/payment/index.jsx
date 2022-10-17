import Link from 'next/link';
import { CardInputContainer, Button } from '../../../shared';
import { Col } from '../../home/pay/payStyles';
import {
  FormContainer,
  Wrapper,
  Column,
  StyledTitle,
  Row,
} from '../formStyles';

const cardItems = [
  {
    id: 'card_number',
    type: 'text',
    src: '/images/card_number.svg',
    placeholder: '1234 1234 1234 1234',
    legend: 'Card number',
  },

  {
    id: 'card_expiry',
    type: 'text',
    src: '/images/card_expiry.svg',
    placeholder: '01/22',
    legend: 'Expiry',
  },

  {
    id: 'card_cvv',
    type: 'text',
    src: '/images/card_cvv.svg',
    placeholder: '123',
    legend: 'CVV',
  },
];

function CardForm({ handleActive }) {
  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Enter your card details</StyledTitle>

        <Column>
          {cardItems.slice(0, 1).map((item, index) => {
            const { id, type, src, placeholder, legend } = item;
            return (
              <CardInputContainer
                key={index}
                id={id}
                type={type}
                src={src}
                placeholder={placeholder}
                legend={legend}
              />
            );
          })}

          <Row>
            {cardItems.slice(1).map((item, index) => {
              const { id, type, src, placeholder, legend } = item;
              return (
                <CardInputContainer
                  key={index}
                  id={id}
                  type={type}
                  src={src}
                  placeholder={placeholder}
                  legend={legend}
                />
              );
            })}
          </Row>

          <Button
            bg={`var(--violet)`}
            width={`100%`}
            onClick={() => handleActive('business')}
          >
            Add card
          </Button>
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default CardForm;
