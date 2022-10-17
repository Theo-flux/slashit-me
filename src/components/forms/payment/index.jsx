import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CardInputContainer, Button } from '../../../shared';
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
    name: 'cardNumber',
    type: 'text',
    src: '/images/card_number.svg',
    placeholder: 'xxxx-xxxx-xxxx-xxxx',
    legend: 'Card number',
  },

  {
    id: 'card_expiry',
    name: 'cardExpiry',
    type: 'text',
    src: '/images/card_expiry.svg',
    placeholder: '01/22',
    legend: 'Expiry',
  },

  {
    id: 'card_cvv',
    name: 'cardCvv',
    type: 'text',
    src: '/images/card_cvv.svg',
    placeholder: '123',
    legend: 'CVV',
  },
];

function CardForm({ handleActive }) {
  const [cardValues, setCardValues] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  function handleCardChanges(event) {
    const { name, value } = event.target;

    if (name === 'cardNumber') {
      let cardNum = document.getElementById('card_number');
      let index = cardNum.value.lastIndexOf('-');
      let test = cardNum.value.substr(index + 1);
      if (test.length === 4 && cardNum.value.length < 16) {
        cardNum.value = `${cardNum.value}-`;
      }

      if (cardNum.value.length === 19) {
        let cardExp = document.getElementById('card_expiry');
        cardExp.focus();
      }
    } else if (name === 'cardExpiry') {
      let cardExp = document.getElementById('card_expiry');
      let test = cardExp.value;

      if (test.length === 2) {
        cardExp.value = `${cardExp.value}/`;
      }

      if (test.length === 5) {
        let cardCvv = document.getElementById('card_cvv');
        cardCvv.focus();
      }
    } else if (name === 'cardCvv') {
      let cardCvv = document.getElementById('card_cvv');
      cardCvv.setAttribute('maxLength', 3);
    }

    setCardValues({ ...cardValues, [name]: value });
  }

  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Enter your card details</StyledTitle>

        <Column>
          {cardItems.slice(0, 1).map((item, index) => {
            const { id, type, src, placeholder, legend, name } = item;
            return (
              <CardInputContainer
                key={index}
                name={name}
                id={id}
                type={type}
                src={src}
                placeholder={placeholder}
                legend={legend}
                onChange={(e) => handleCardChanges(e)}
              />
            );
          })}

          <Row>
            {cardItems.slice(1).map((item, index) => {
              const { id, type, src, placeholder, legend, name } = item;
              return (
                <CardInputContainer
                  key={index}
                  name={name}
                  id={id}
                  type={type}
                  src={src}
                  placeholder={placeholder}
                  legend={legend}
                  onChange={(e) => handleCardChanges(e)}
                />
              );
            })}
          </Row>

          <Button bg={`var(--violet)`} width={`100%`}>
            Add card
          </Button>
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default CardForm;
