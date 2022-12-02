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
import {
  setAnyAction,
  setAnyTab,
  setExtraTab,
} from '../../../../store/reducers/helper';

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
  const anyAction = useSelector((state) => state.helper.anyAction);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const [isMailValidated, setIsMailValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
      return;
    } else if (!orderer.email.match(mailformat)) {
      setError({ ...error, email: 'Invalid Email!' });
      return;
    }
    validateShopper();
  }

  function handlePasswordSubmit() {
    let errors = {};
    if (!orderer.password) {
      setError({ ...errors, password: 'Enter password!' });
    } else {
      login();
    }
  }

  function topPress() {
    if (activeTab?.page == 'Orderer') {
      dispatch(setAnyTab());
      setShowDetails(false);
      setShowSummary(false);
    } else {
      dispatch(
        setAnyTab({
          page: 'Orderer',
        }),
      );
      setShowDetails(true);
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
      isBusiness: false,
    };

    let sendReq = await Login(userInfo);
    if (sendReq.success) {
      SaveLoginCredentials(
        JSON.stringify({ ...userInfo, token: sendReq.token }),
      );
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(sendReq.user));
      let showFew = true;
      let cardReq = await FetchCards(showFew);
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

  console.log(orderer.email, 'email', isMailValidated, activeTab);

  async function validateShopper() {
    setLoading(true);

    let sendReq = await ShopperExist(orderer.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        setPass(statusCode.COMPLETE_REGISTRATION);
        dispatch(setExtraTab({ page: 'VerifyEmail', params: {} }));
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
    setShowDetails(true); //Open User Details Form
    isMailValidated ? handlePasswordSubmit() : handleEmailContinue();
  }

  useEffect(() => {
    if (activeTab?.page == 'Orderer') {
      if (anyAction) {
        CtrlOrder();
      }
    }
  }, [anyAction, isMailValidated]);

  console.log(activeTab, orderer);

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-shopping-bag-2-line" />
            <ItemText>Your order</ItemText>
          </ItemPod>

          <Icon
            onClick={() => topPress()}
            className={
              activeTab?.page == 'Orderer'
                ? 'ri-arrow-up-s-line'
                : 'ri-arrow-down-s-line'
            }
          />
        </Top>

<<<<<<< HEAD
        {activeTab?.page == 'Orderer' && (
          <OrderContent>
            <OrderDetails>
              <Row>
                <Text>Your details</Text>
                <Icon
                  onClick={() => setShowDetails(!showDetails)}
=======
        {activeTab?.page === 'Orderer' && (
          <OrderContent>
            <OrderDetails>
              <Row onClick={() => setShowDetails(!showDetails)}>
                <Text>Your details</Text>
                <Icon
>>>>>>> main
                  className={
                    showDetails ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  }
                />
              </Row>
<<<<<<< HEAD
              {showDetails && (
=======

              {showDetails || (
>>>>>>> main
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
                              Use your Slashit email address if you have a
                              Slashit account
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
<<<<<<< HEAD
                    <>
                      {/*TODO-Show "Your Order 6 (logged in user with user?.avatar ) or 7 UI - logged in user without avatar"*/}{' '}
                    </>
=======
                    <>{/*TODO-Show "Your Order 6 or 7 UI"*/} </>
>>>>>>> main
                  )}
                </Details>
              )}
            </OrderDetails>

            <OrderSummary>
<<<<<<< HEAD
              <Row>
                <Text>Order Summary</Text>
                <Icon
                  onClick={() => setShowSummary(!showSummary)}
=======
              <Row onClick={() => setShowSummary(!showSummary)}>
                <Text>Order Summary</Text>
                <Icon
>>>>>>> main
                  className={
                    showSummary ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  }
                />
              </Row>
<<<<<<< HEAD
              {showSummary && (
=======

              {showSummary || (
>>>>>>> main
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
        )}
<<<<<<< HEAD
=======
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
>>>>>>> main
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Orderer;
