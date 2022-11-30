import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AmountSeparator } from '../../../../helpers/numberValidation';
import { Button, InputContainer, TextAreaContainer } from '../../../../shared';
import {
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  Top,
  Row,
  Text,
  ButtonWrapper,
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
import {
  Login,
  SaveLoginCredentials,
  ShopperExist,
} from '../../../../api/userAPI';
import {
  setEmail,
  setIsLoggedIn,
  setUser,
} from '../../../../store/reducers/auth';
import { FetchCards } from '../../../../api/transactionAPI';
import {
  setCards,
  setPreferredCard,
} from '../../../../store/reducers/transaction';
import { setAnyAction, setAnyTab } from '../../../../store/reducers/helper';

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

function Orderer({}) {
  let toastMsg = '';

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.helper.anyTab);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const [isMailValidated, setIsMailValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const cards = useSelector((state) => state.transaction.cards);
  const [error, setError] = useState({});
  const [orderer, setOrderer] = useState({
    email: '',
    password: '',
  });

  function resetOrderer() {
    setOrderer({
      email: '',
      password: '',
    });
    setIsMailValidated(false);
  }

  function handleOrdererOnchange(event) {
    const { name, value } = event.target;
    setOrderer({ ...orderer, [name]: value });
  }

  function handleEmailContinue() {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!orderer.email) {
      setError({ ...error, email: 'Email is empty!' });
    } else if (!orderer.email.match(mailformat)) {
      setError({ ...error, email: 'Invalid Email!' });
    } else {
      setError({});
    }

    if (error?.email) {
      //You can do anything here
    } else {
      validateShopper();
    }
  }

  function handlePasswordSubmit() {
    let errors = {};

    if (!form.password) {
      errors.password = 'Enter password!';
    } else {
      errors = {};
    }

    if (errors.password) {
      setError(errors);
    } else {
      login();
    }
  }

  //async functions
  async function login() {
    setLoading(true);
    let userInfo = {
      email: orderer.email,
      password: orderer.password,
      platform: 'web',
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    };

    let sendReq = await Login(userInfo);
    if (sendReq.success) {
      SaveLoginCredentials(
        JSON.stringify({ ...userInfo, token: sendReq.token }),
      );
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(sendReq.user));
      let cardReq = await FetchCards((showFew = true));
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(setCards(cardReq.result));
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      }
      dispatch(setAnyTab({ page: 'Scheduler', params: '' }));
    } else {
      toastMsg = sendReq.message;
    }
    setLoading(false);
    return;
  }

  async function validateShopper() {
    setLoading(true);

    let sendReq = await ShopperExist(orderer.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        setPass(statusCode.COMPLETE_REGISTRATION);
        dispatch(setAnyTab({ page: 'VerifyEmail', params: {} }));
      } else if (sendReq.code == statusCode.OK) {
        dispatch(setEmail(orderer.email)); //Store user email in global state
        setPass(statusCode.OK);
      }
    } else {
      setPass(statusCode.NOT_FOUND);
      dispatch(setEmail(orderer.email)); //Store user email in global state
    }
    setIsMailValidated(true);
    setLoading(false);
    return;
  }

  async function CtrlOrder() {
    isMailValidated ? handlePasswordSubmit() : handleEmailContinue();
  }

  useEffect(() => {
    if (activeTab == 'Orderer') {
      dispatch(
        setAnyAction({
          action: CtrlOrder,
        }),
      );
    }
  });

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-shopping-bag-2-line" />
            <ItemText>Your order</ItemText>
          </ItemPod>

          <Icon
            className={
              activeTab?.page == 'Orderer'
                ? 'ri-arrow-down-s-line'
                : 'ri-arrow-up-s-line'
            }
          />
        </Top>

        <OrderContent>
          <OrderDetails>
            <Row>
              <Text>Your details</Text>{' '}
              <Icon
                className={
                  activeTab?.page == 'Orderer'
                    ? 'ri-arrow-down-s-line'
                    : 'ri-arrow-up-s-line'
                }
              />
            </Row>
            {activeTab?.page == 'Orderer' && (
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

                    {isMailValidated && pass == statusCode.NOT_FOUND && (
                      <>{/* {"TODO -  "Your Order 8 UI" } */}</>
                    )}
                  </>
                ) : (
                  <>{/*TODO-Show "Your Order 6 or 7 UI"*/} </>
                )}
              </Details>
            )}
          </OrderDetails>

          <OrderSummary>
            <Row>
              <Text>Order Summary</Text>
              <Icon
                className={
                  activeTab?.page == 'Orderer'
                    ? 'ri-arrow-down-s-line'
                    : 'ri-arrow-up-s-line'
                }
              />
            </Row>
            {activeTab?.page == 'Orderer' && (
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
                      {getSymbolFromCurrency(orderDetails?.currency)}
                      {AmountSeparator(
                        orderDetails?.amount - orderDetails?.shippingCost,
                      )}
                    </SubtotalPrice>
                  </SubTotal>
                  <Shipping>
                    <ShippingText>Shipping</ShippingText>
                    <ShippingPrice>
                      {getSymbolFromCurrency(orderDetails?.currency)}
                      {AmountSeparator(orderDetails?.shippingCost)}
                    </ShippingPrice>
                  </Shipping>
                </SubTotalContainer>

                <Total>
                  <TotalText>Total</TotalText>
                  <TotalPrice>
                    {getSymbolFromCurrency(orderDetails?.currency)}
                    {AmountSeparator(orderDetails?.amount)}
                  </TotalPrice>
                </Total>
              </Orders>
            )}
          </OrderSummary>
        </OrderContent>
        <ButtonWrapper>
          {/* {openOrder || (
            <Button
              onClick={() =>
                !isLoggedIn
                  ? setOpenOrder(true)
                  : dispatch(setAnyTab({ page: 'Scheduler', params: '' }))
              }
              width={`100%`}
            >
              Pay now
            </Button>
          )} */}

          {/* {openOrder && ( */}
          {/* <Button
            onClick={() =>
              isMailValidated ? handlePasswordSubmit() : handleEmailContinue()
            }
            width={`100%`}
          >
            Confirm
          </Button> */}
          {/* )} */}
        </ButtonWrapper>
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Orderer;

//TODO - If ismailvalidated &  pass is NOT_FOUND, don't show password field instead show only the orderer.email "Your Order 8"
