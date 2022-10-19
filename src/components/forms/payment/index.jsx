import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CardInputContainer, Button } from '../../../shared';
import {
  FormContainer,
  Wrapper,
  Column,
  StyledTitle,
  Row,
  StyledText,
  CardBox,
  CardDetails,
  InnerBoxRow,
  StyledImage,
  ContentText,
  CardNumber,
  CardExpiry,
} from '../formStyles';
import { checkCreditCard } from '../../../helpers';

const cardItems = [
  {
    id: 'card_number',
    name: 'cardNumber',
    type: 'text',
    src: '/images/card_number.svg',
    placeholder: 'xxxx xxxx xxxx xxxx',
    legend: 'Card number',
    maxlength: 19,
  },

  {
    id: 'card_expiry',
    name: 'cardExpiry',
    type: 'text',
    src: '/images/card_expiry.svg',
    placeholder: '01/22',
    legend: 'Expiry',
    maxlength: 5,
  },

  {
    id: 'card_cvv',
    name: 'cardCvv',
    type: 'text',
    src: '/images/card_cvv.svg',
    placeholder: '123',
    legend: 'CVV',
    maxlength: 3,
  },
];

const availableCard = {
  MasterCard: '/images/mastercard.svg',
  Visa: '/images/visa.svg',
};

function CardForm() {
  const [getCard, setgetCard] = useState('add-card');
  const [cardValues, setCardValues] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [cardImage, setCardImage] = useState('');

  function handleCardChanges(event) {
    const { name, value } = event.target;

    if (name === 'cardNumber') {
      let cardNum = document.getElementById('card_number');
      let index = cardNum.value.lastIndexOf(' ');
      let test = cardNum.value.substr(index + 1);
      if (test.length === 4 && cardNum.value.length < 16) {
        cardNum.value = `${cardNum.value} `;
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
    }

    setCardValues({ ...cardValues, [name]: value });
  }

  function handleOnSubmit(cardnumber) {
    let res = checkCreditCard(cardnumber);
    setErrorMessage(res.message);
    setCardImage(availableCard[res.type]);

    if (res.success) {
      return setgetCard('add-pin');
    }
  }

  return (
    <>
      {getCard === 'add-card' && (
        <FormContainer>
          <Wrapper>
            <StyledTitle>Enter your card details</StyledTitle>

            <Column>
              {cardItems.slice(0, 1).map((item, index) => {
                const { id, type, src, placeholder, legend, name, maxlength } =
                  item;
                return (
                  <CardInputContainer
                    key={index}
                    name={name}
                    id={id}
                    type={type}
                    src={src}
                    placeholder={placeholder}
                    legend={legend}
                    maxlength={maxlength}
                    onChange={(e) => handleCardChanges(e)}
                    error={errorMessage && errorMessage}
                  />
                );
              })}

              <Row>
                {cardItems.slice(1).map((item, index) => {
                  const {
                    id,
                    type,
                    src,
                    placeholder,
                    legend,
                    name,
                    maxlength,
                  } = item;
                  return (
                    <CardInputContainer
                      key={index}
                      name={name}
                      id={id}
                      type={type}
                      src={src}
                      placeholder={placeholder}
                      legend={legend}
                      maxlength={maxlength}
                      onChange={(e) => handleCardChanges(e)}
                    />
                  );
                })}
              </Row>

              <Button
                bg={`var(--violet)`}
                width={`100%`}
                onClick={() => handleOnSubmit(cardValues.cardNumber)}
              >
                Add card
              </Button>
            </Column>
          </Wrapper>
        </FormContainer>
      )}

      {getCard === 'add-pin' && (
        <FormContainer>
          <Wrapper>
            <StyledTitle>Enter your card pin</StyledTitle>
            <StyledText>
              Please enter your card PIN below and press continue
            </StyledText>

            <CardBox>
              <CardDetails>Card details</CardDetails>
              <InnerBoxRow>
                <StyledImage>
                  <Image
                    src={cardImage || '/image/card_number.svg'}
                    width={40}
                    height={40}
                    alt="card-image"
                  />
                </StyledImage>

                <CardNumber>{cardValues.cardNumber}</CardNumber>
                <CardExpiry>{cardValues.cardExpiry}</CardExpiry>
              </InnerBoxRow>
            </CardBox>

            <Column>
              <Button bg={`var(--violet)`} width={`100%`}>
                Continue
              </Button>
            </Column>
          </Wrapper>
        </FormContainer>
      )}
    </>
  );
}

export default CardForm;
