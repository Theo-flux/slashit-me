import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import statusCode from '../../../../api/statusCode';
import {
  FetchVirtualAccount,
  PayNow,
  UpdateShippingAddress,
} from '../../../../api/transactionAPI';
import { FetchUserById } from '../../../../api/userAPI';
import { setUser } from '../../../../store/reducers/auth';
import {
  setAnyAction,
  setAnySuccess,
  setAnyTab,
} from '../../../../store/reducers/helper';
import { Button, InputContainer } from '../../../../shared';
import {
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  Top,
} from '../storeStyle';
import {
  ContentBox,
  InnerContent,
  AmountContainer,
  PaymentMethodContainer,
  PaymentMethod,
  PaymentMethodInner,
  PaymentIcon,
  StyledTitle,
  PayTitle,
  Wrapper,
  Row,
  Column,
  ChangeBtn,
  NewTag,
  ExtraText,
  Bottom,
  BottomRow,
  Slip,
  SlipInner,
  AccountDetails,
  DetailsRow,
  CoptyBtn,
  DeliveryContent,
} from './confirmerStyles';
import getSymbolFromCurrency from 'currency-symbol-map';
import { AmountSeparator } from '../../../../helpers/numberValidation';

const deliveryInfo = [
  {
    type: 'text',
    legend: 'Full Name',
    placeholder: 'john doe',
    id: 'full_name',
    name: 'fullname',
  },

  {
    type: 'text',
    legend: 'Street Address',
    placeholder: '81, Maculay Str. Alagbaka',
    id: 'street_address',
    name: 'streetAddress',
  },

  {
    type: 'text',
    legend: 'Country',
    placeholder: 'Nigeria',
    id: 'country',
    name: 'country',
  },

  {
    type: 'text',
    legend: 'State',
    placeholder: 'Ondo',
    id: 'state',
    name: 'state',
  },

  {
    type: 'text',
    legend: 'Zipcode',
    placeholder: '380120',
    id: 'zipcode',
    name: 'zipcode',
  },
];

const Card = ({ onClick }) => {
  return (
    <BottomRow onClick={onClick}>
      <PaymentIcon color={'white'} className="ri-checkbox-blank-circle-line" />
      <Row>
        <Image
          src={'/images/mastercard logo.svg'}
          height={40}
          width={40}
          alt="card_issuer"
        />
        <PayTitle> •••• 1050 12/2025</PayTitle>
      </Row>
    </BottomRow>
  );
};

function Confirmer(props) {
  let toastMsg = '';
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const cards = useSelector((state) => state.transaction.cards);
  const user = useSelector((state) => state.userAuth.user);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const [fetchingBank, setFetchingBank] = useState(false);
  const [bankDetails, setBankDetails] = useState();
  const [shippingDetails, setShipingDetails] = useState();
  const [selectedOrderMethod, setSelectedOrderMethod] = useState('Card'); //Card or Balance
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(preferredCard);
  const activeTab = useSelector((state) => state.helper.anyTab);
  const anyAction = useSelector((state) => state.helper.anyAction);
  const [showCardList, setShowCardList] = useState(false);

  function topPress() {
    if (!isLoggedIn) return;
    if (activeTab?.page == 'Confirmer') {
      dispatch(setAnyTab());
    } else {
      dispatch(
        setAnyTab({
          page: 'Confirmer',
        }),
      );
    }
  }

  //async functions
  async function getAccountNumber() {
    setFetchingBank(true);
    let sendReq = await FetchVirtualAccount(activeTab?.scheduleSelected[0].amount);
    if (sendReq.success) {
      setBankDetails(sendReq.result);
      setFetchingBank(false);
    }
  }

  async function updateAddress() {
    setLoading(true);
    let sendReq = await UpdateShippingAddress(
      shippingDetails,
      orderDetails._id,
    );
    if (sendReq.success) {
      //Do nothing
    } else {
      toastMsg = sendReq.message;
    }
    setLoading(false);
  }

  async function payNow() {
    setLoading(true);
    let payload = {};
    if (selectedOrderMethod == 'Card') {
      payload = {
        order: orderDetails._id,
        paymentOption: activeTab?.scheduleSelected,
        source: 'Card',
        card: selectedCard._id,
      };
    } else {
      payload = {
        order: orderDetails._id,
        paymentOption: activeTab?.scheduleSelected,
        source: 'Balance',
      };
    }
    let sendReq = await PayNow(payload);
    if (sendReq.success) {
      dispatch(setAnySuccess(true));
      toastMsg = 'Your order has been confirmed';
    } else {
      toastMsg = sendReq.message;
    }
    setLoading(false);
  }

  async function fetchUser() {
    if (isLoggedIn) {
      const fetchData = await FetchUserById();
      if (fetchData.success) {
        dispatch(setUser(fetchData.user));
      }
    }
  }

  let acctEl = useRef(null);
  let copyBtn = useRef(null);

  async function copyNum() {
    // console.log(acctEl.current.textContent);

    try {
      await navigator.clipboard.writeText(acctEl.current.textContent);
      copyBtn.current.textContent = 'copied!';
      // console.log('Content copied to clipboard');
      setTimeout(() => {
        copyBtn.current.textContent = 'copy';
      }, 3000);
    } catch (err) {
      // console.error('Failed to copy: ', err);
    }
  }

  useEffect(() => {
    if (!user.country) {
      fetchUser();
    }
  }, []);

  async function CtrlConfirmer() {
    payNow();
  }

  useEffect(() => {
    if (activeTab == 'Confirmer') {
      if (anyAction) {
        CtrlConfirmer();
      }
    }
  }, []);

  console.log(cards, 'cards')

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-checkbox-circle-line" />
            <ItemText>Confirm Order</ItemText>
          </ItemPod>

          <Icon
            onClick={() => topPress()}
            className={
              activeTab?.page == 'Confirmer'
                ? 'ri-arrow-up-s-line'
                : 'ri-arrow-down-s-line'
            }
          />

          {/* 
          //TODOS
          //What you'll pay today -activeTab.scheduleSelected[0].amount
          //How you'll pay - preferredCard or spending balance
          // Preferred card is selected by default [if change is tapped, list all the cards available : onClick of a list item, setSelectedCard to item]
          //If spending balance is selected - Fetch virtual account number

          */}
        </Top>
        {activeTab?.page == 'Confirmer' && (
          <Wrapper>
            <ContentBox>
              <InnerContent>
                <StyledTitle>What you will pay</StyledTitle>
                <AmountContainer>
                  {getSymbolFromCurrency(orderDetails?.currency || 'NGN')}
                  {activeTab && activeTab.scheduleSelected
                    ? activeTab?.scheduleSelected[0].amount
                    : 0}
                </AmountContainer>
              </InnerContent>
            </ContentBox>

            <ContentBox>
              <InnerContent>
                <StyledTitle>How you will pay</StyledTitle>

                <PaymentMethodContainer>
                  <PaymentMethodInner>
                    <PaymentMethod>
                      <Row>
                        <PaymentIcon
                          onClick={() => setSelectedOrderMethod('Card')}
                          className={`${
                            selectedOrderMethod === 'Card'
                              ? 'ri-checkbox-circle-fill'
                              : 'ri-checkbox-blank-circle-line'
                          } `}
                        />
                        <Row>
                          <Image
                            src={
                              `${preferredCard?.cardLogo}` ||
                              '/images/mastercard logo.svg' //TODO - Replace the mastercard logo on this line with any transparent image to prevent type errors
                            }
                            height={40}
                            width={40}
                            alt="card_brand"
                          />
                          <PayTitle>
                            {'  '}
                            •••• {preferredCard?.last_4digits}{' '}
                            {preferredCard?.expiry}
                          </PayTitle>
                        </Row>
                      </Row>
                      {showCardList || (
                        <ChangeBtn
                          onClick={() => setShowCardList(!showCardList)}
                        >
                          Change
                        </ChangeBtn>
                      )}
                    </PaymentMethod>

                    {showCardList && (
                      <Bottom>
                        {cards &&
                          cards.length > 0 &&
                          cards.map((item) => {
                            <Card
                              key={item._id}
                              onClick={() => {
                                setSelectedCard(item);
                                setShowCardList(!showCardList);
                              }}
                            />;
                          })}
                      </Bottom>
                    )}
                  </PaymentMethodInner>

                  <PaymentMethodInner>
                    <PaymentMethod>
                      <Row>
                        <PaymentIcon
                          onClick={() => {
                            getAccountNumber();
                            setSelectedOrderMethod('Balance');
                          }}
                          className={`${
                            selectedOrderMethod == 'Balance'
                              ? 'ri-checkbox-circle-fill'
                              : 'ri-checkbox-blank-circle-line'
                          } `}
                        />
                        <Column>
                          <PayTitle>Spending balance</PayTitle>
                          <ExtraText>
                            {getSymbolFromCurrency(user?.currencyShortCode)}
                            {AmountSeparator(user?.shopper?.availableBalance)}
                          </ExtraText>
                        </Column>
                      </Row>
                      <NewTag>New</NewTag>
                    </PaymentMethod>
                  </PaymentMethodInner>
                </PaymentMethodContainer>
              </InnerContent>
            </ContentBox>

            <ContentBox>
              <Row>
                <StyledTitle>Delivery Address</StyledTitle>
                <Icon className={'ri-arrow-down-s-line'} />
              </Row>

              <DeliveryContent>
                {deliveryInfo.map((data, index) => {
                  const { type, legend, placeholder, id, name } = data;
                  return (
                    <InputContainer
                      key={index}
                      type={type}
                      legend={legend}
                      placeholder={placeholder}
                      id={id}
                      name={name}
                    />
                  );
                })}

                <Button width={'100%'}>Save Address</Button>
              </DeliveryContent>
            </ContentBox>

            <ContentBox>
              <Button disabled={true} width={'100%'}>
                Pay NGN 3,000
              </Button>
            </ContentBox>
          </Wrapper>
        )}
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Confirmer;
