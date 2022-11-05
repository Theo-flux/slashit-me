import { useState } from 'react';
import { InputContainer, TextAreaContainer } from '../../../../shared';
import {
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  Top,
  Row,
  Text,
} from '../storeStyle';
import {
  OrderContent,
  OrderDetails,
  Details,
  OrderSummary,
  InfoBox,
  InfoText,
  Orders,
  OrderItems,
  OrderedItem,
  ItemName,
  ItemQty,
  ItemPrice,
  SubTotalContainer,
  SubTotal,
  Shipping,
  TotalContainer,
  Total,
  SubtotalText,
  ShippingText,
  TotalText,
  SubtotalPrice,
  ShippingPrice,
  TotalPrice,
} from './orderStyles';

const orderedItems = [
  {
    id: '1',
    name: 'Pen',
    qty: '1',
    price: 'NGN 1200.00',
  },
  {
    id: '2',
    name: 'Pencil',
    qty: '10',
    price: 'NGN 1200.00',
  },
  {
    id: '3',
    name: 'Keyboard',
    qty: '109',
    price: 'NGN 1200.00',
  },
  {
    id: '4',
    name: 'Mouse',
    qty: '500',
    price: 'NGN 1200.00',
  },
  {
    id: '1',
    name: 'Pen',
    qty: '1',
    price: 'NGN 1200.00',
  },
  {
    id: '2',
    name: 'Pencil',
    qty: '10',
    price: 'NGN 1200.00',
  },
  {
    id: '3',
    name: 'Keyboard',
    qty: '109',
    price: 'NGN 1200.00',
  },
  {
    id: '4',
    name: 'Mouse',
    qty: '500',
    price: 'NGN 1200.00',
  },
];

function Orderer({ openOrderer }) {
  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-shopping-bag-2-line" />
            <ItemText>Your order</ItemText>
          </ItemPod>

          <Icon className="ri-arrow-down-s-line" />
        </Top>

        <OrderContent>
          <OrderDetails>
            <Row>
              <Text>Your details</Text>{' '}
              <Icon
                className={`${
                  openOrderer ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                }`}
              />
            </Row>
            {openOrderer && (
              <Details>
                <InputContainer
                  id={'orderer-email'}
                  type={'email'}
                  name={'email'}
                  legend={'Enter email address'}
                  // onChange={}
                  // error={}
                />
                <InfoBox>
                  <Icon className="fa-solid fa-circle-info"></Icon>
                  <InfoText>
                    Use your Slashit email address if you have a Slashit account
                  </InfoText>
                </InfoBox>
              </Details>
            )}
          </OrderDetails>

          <OrderSummary>
            <Row>
              <Text>Order Summary</Text>
              <Icon
                className={`${
                  openOrderer ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                }`}
              />
            </Row>
            {openOrderer && (
              <Orders>
                <OrderItems>
                  {orderedItems.map((orderedItem, index) => {
                    const { name, qty, price } = orderedItem;
                    return (
                      <OrderedItem key={index}>
                        <ItemName>{name}</ItemName>
                        <ItemQty>{qty}</ItemQty>
                        <ItemPrice>{price}</ItemPrice>
                      </OrderedItem>
                    );
                  })}
                  <OrderedItem>
                    <TextAreaContainer
                      legend={'Note'}
                      placeholder={'Pay me on Slashit 🙏'}
                      rows={3}
                    />
                  </OrderedItem>
                </OrderItems>

                <SubTotalContainer>
                  <SubTotal>
                    <SubtotalText>Subtotal</SubtotalText>
                    <SubtotalPrice>NGN 32,000.00</SubtotalPrice>
                  </SubTotal>
                  <Shipping>
                    <ShippingText>Shipping</ShippingText>
                    <ShippingPrice>NGN 32,000.00</ShippingPrice>
                  </Shipping>
                </SubTotalContainer>

                <Total>
                  <TotalText>Total</TotalText>
                  <TotalPrice>NGN 32,000.00</TotalPrice>
                </Total>
              </Orders>
            )}
          </OrderSummary>
        </OrderContent>
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Orderer;
