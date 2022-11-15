import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AmountSeparator } from '../../../../helpers/numberValidation';
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
import getSymbolFromCurrency from 'currency-symbol-map';
import statusCode from '../../../../api/statusCode';

// const orderedItems = [
//   {
//     id: '1',
//     name: 'Pen',
//     qty: '1',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '2',
//     name: 'Pencil',
//     qty: '10',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '3',
//     name: 'Keyboard',
//     qty: '109',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '4',
//     name: 'Mouse',
//     qty: '500',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '1',
//     name: 'Pen',
//     qty: '1',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '2',
//     name: 'Pencil',
//     qty: '10',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '3',
//     name: 'Keyboard',
//     qty: '109',
//     price: 'NGN 1200.00',
//   },
//   {
//     id: '4',
//     name: 'Mouse',
//     qty: '500',
//     price: 'NGN 1200.00',
//   },
// ];

function Orderer({
  openOrder,
  handleOrdererOnchange,
  error,
  orderer,
  isMailValidated,
  resetOrderer,
  pass,
}) {
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

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
                  openOrder ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                }`}
              />
            </Row>
            {openOrder && (
              <Details>
                {!isLoggedIn ? (
                  <>
                    {!isMailValidated && !pass && (
                      <>
                        <InputContainer
                          id={'orderer-email'}
                          type={'email'}
                          name={'email'}
                          legend={'Enter email address'}
                          onChange={(e) => handleOrdererOnchange(e)}
                          error={error?.email}
                        />
                        <InfoBox>
                          <Icon className="fa-solid fa-circle-info"></Icon>
                          <InfoText>
                            Use your Slashit email address if you have a Slashit
                            account
                          </InfoText>
                        </InfoBox>
                      </>
                    )}

                    {isMailValidated && pass == statusCode.OK && (
                      <>
                        <InputContainer
                          id={'orderer-password'}
                          type={'text'}
                          name={'password'}
                          legend={'Enter your password'}
                          onChange={(e) => handleOrdererOnchange(e)}
                          error={error?.password}
                        />
                        <InfoBox>
                          <Icon className="fa-solid fa-circle-info"></Icon>
                          <InfoText>{orderer?.email}</InfoText>
                          {/* {"TODO - Not you button - onClick resetOrderer"} */}
                        </InfoBox>
                      </>
                    )}

                    {isMailValidated && pass == statusCode.UNAUTHORIZED && (
                      <>{/* {"TODO -  "Your Order 8 UI" } */}</>
                    )}
                  </>
                ) : (
                  <>
                    {/*TODO-Show "Your Order 7 UI" user?.avatar or the first letter of user?lastname and user?firstname*/}{' '}
                  </>
                )}
              </Details>
            )}
          </OrderDetails>

          <OrderSummary>
            <Row>
              <Text>Order Summary</Text>
              <Icon
                className={`${
                  openOrder ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                }`}
              />
            </Row>
            {openOrder && (
              <Orders>
                <OrderItems>
                  {orderDetails?.isCreatedFromAPI ? (
                    orderDetails?.products.map((orderedItem, index) => {
                      const { title, quantity, price, _id, currrency } =
                        orderedItem;
                      return (
                        <OrderedItem key={_id}>
                          <ItemName>{title}</ItemName>
                          <ItemQty>{quantity}</ItemQty>
                          <ItemPrice>
                            {getSymbolFromCurrency(currrency)}
                            {AmountSeparator(price)}
                          </ItemPrice>
                        </OrderedItem>
                      );
                    })
                  ) : (
                    <OrderedItem>
                      <TextAreaContainer
                        legend={'Note'}
                        placeholder={orderDetails?.note || ''}
                        rows={3}
                        disabled
                      />
                    </OrderedItem>
                  )}
                </OrderItems>

                <SubTotalContainer>
                  <SubTotal>
                    <SubtotalText>Subtotal</SubtotalText>
                    <SubtotalPrice>
                      {getSymbolFromCurrency(orderDetails.currency)}
                      {AmountSeparator(
                        orderDetails.amount - orderDetails.shippingCost,
                      )}
                    </SubtotalPrice>
                  </SubTotal>
                  <Shipping>
                    <ShippingText>Shipping</ShippingText>
                    <ShippingPrice>
                      {getSymbolFromCurrency(orderDetails.currency)}
                      {AmountSeparator(orderDetails.shippingCost)}
                    </ShippingPrice>
                  </Shipping>
                </SubTotalContainer>

                <Total>
                  <TotalText>Total</TotalText>
                  <TotalPrice>
                    {getSymbolFromCurrency(orderDetails.currency)}
                    {AmountSeparator(orderDetails.amount)}
                  </TotalPrice>
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

//TODO - If ismailvalidated &  pass is UNAUTHORIZED, don't show password field instead show only the orderer.email "Your Order 8"
