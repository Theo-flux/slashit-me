import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AmountSeparator } from '../../../../helpers/numberValidation';
import {
  Button,
  InputContainer,
  TextAreaContainer,
  Toast,
} from '../../../../shared';
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
  InfoMailText,
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
  SmallBtn,
  AvatarContainer,
  UserInitials,
  StyledAvatarImage,
  UserName,
} from './orderStyles';
import getSymbolFromCurrency from 'currency-symbol-map';
import statusCode from '../../../../api/statusCode';
import { Login, ShopperExist } from '../../../../api/userAPI';
import {
  setEmail,
  setSignUpInfo,
  setUser,
} from '../../../../store/reducers/auth';
import { FetchCards } from '../../../../api/transactionAPI';
import {
  setCards,
  setPreferredCard,
} from '../../../../store/reducers/transaction';
import { useLocalStorage, useTabs, useToast } from '../../../../hooks';

function Orderer({}) {
  const dispatch = useDispatch();

  const { activeTab, anyAction, extraTab, setActiveTab, setExtraTab } =
    useTabs();
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const [isMailValidated, setIsMailValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastOptions, toast] = useToast();
  const { session, setSession } = useLocalStorage();
  const [pass, setPass] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const cards = useSelector((state) => state.transaction.cards);
  const inputEmail = useSelector((state) => state.userAuth.userEmail);
  const user = useSelector((state) => state.userAuth.user);
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
    dispatch(setEmail());
    dispatch(setUser({ country: null, avatar: null }));
    //setIsMailValidated(false);
    setPass();
    setSession({ session: false });
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
      setActiveTab();
      setShowDetails(false);
      setShowSummary(false);
    } else {
      setActiveTab({
        page: 'Orderer',
      });
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
      setSession({ userInfo, token: sendReq.token, session: true });
      dispatch(setUser(sendReq.user));
      let showFew = true;
      let cardReq = await FetchCards(showFew);
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(setCards(cardReq.result));
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      }
    } else {
      toast({ text: sendReq.message, textColor: '#fff' });
    }
    setLoading(false);
    return;
  }

  console.log(session, pass, 'passed order');

  async function validateShopper() {
    setLoading(true);

    let sendReq = await ShopperExist(orderer.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        setPass(statusCode.COMPLETE_REGISTRATION);
        setExtraTab({ page: 'VerifyEmail', params: {} });
      } else if (sendReq.code == statusCode.OK) {
        dispatch(setEmail(orderer.email)); //Store user email in global state
        setPass(statusCode.OK);
      }
    } else {
      setPass(statusCode.NOT_FOUND);
      dispatch(setEmail(orderer.email)); //Store user email in global state
      dispatch(setSignUpInfo({ email: orderer.email }));
    }
    //setIsMailValidated(true);
    setLoading(false);
    return;
  }

  async function CtrlOrder() {
    setShowDetails(true); //Open User Details Form
    pass == statusCode.OK ? handlePasswordSubmit() : handleEmailContinue();
    pass == statusCode.NOT_FOUND &&
      setActiveTab({
        page: 'Scheduler',
        params: {},
      });
    return;
  }

  useEffect(() => {
    if (activeTab?.page == 'Orderer') {
      if (anyAction) {
        CtrlOrder();
      }
    }
  }, [anyAction, pass]);

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Toast options={toastOptions} />
        <Top onClick={() => topPress()}>
          <ItemPod>
            <Icon className="ri-shopping-bag-2-line" />
            <ItemText>Your order</ItemText>
          </ItemPod>

          <Icon
            className={
              activeTab?.page == 'Orderer'
                ? 'ri-arrow-up-s-line'
                : 'ri-arrow-down-s-line'
            }
          />
        </Top>

        {activeTab?.page === 'Orderer' && (
          <OrderContent>
            <OrderDetails>
              <Row onClick={() => setShowDetails(!showDetails)}>
                <Text>Your details</Text>
                <Icon
                  className={
                    showDetails ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  }
                />
              </Row>

              {showDetails && (
                <Details>
                  {!session ? (
                    <>
                      {!pass && (
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

                      {pass == statusCode.OK && (
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
                            <SmallBtn onClick={() => resetOrderer()}>
                              Not you?
                            </SmallBtn>
                          </InfoBox>
                        </>
                      )}

                      {pass == statusCode.NOT_FOUND && (
                        <>
                          <InfoMailText>{inputEmail}</InfoMailText>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <AvatarContainer>
                        {user.avatar ? (
                          <StyledAvatarImage
                            src={user?.avatar}
                            height={50}
                            width={50}
                            alt="avatar"
                          />
                        ) : (
                          <UserInitials>
                            {user.lastname ? user?.lastname.substr(0, 1) : ''}
                            {user.firstname ? user?.firstname.substr(0, 1) : ''}
                          </UserInitials>
                        )}

                        <UserName>
                          {user?.lastname} {user?.firstname}
                        </UserName>
                      </AvatarContainer>
                      <InfoBox>
                        <InfoText>{orderer?.email}</InfoText>
                        <Icon className="fa-solid fa-circle-info"></Icon>
                        <SmallBtn onClick={() => resetOrderer()}>
                          Log out
                        </SmallBtn>
                      </InfoBox>
                    </>
                  )}
                </Details>
              )}
            </OrderDetails>

            <OrderSummary>
              <Row onClick={() => setShowSummary(!showSummary)}>
                <Text>Order Summary</Text>
                <Icon
                  className={
                    showSummary ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
                  }
                />
              </Row>

              {showSummary && (
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
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Orderer;
