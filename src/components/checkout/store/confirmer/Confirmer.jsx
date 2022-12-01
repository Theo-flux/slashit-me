import { useEffect, useState } from 'react';
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
} from './confirmerStyles';

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

  const [showCardList, setShowCardList] = useState(false);

  //async functions
  async function getAccountNumber() {
    setFetchingBank(true);
    let sendReq = await FetchVirtualAccount(anyTab?.scheduleSelected[0].amount);
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
      dispatch(
        setAnyAction({
          action: CtrlConfirmer,
        }),
      );
    }
  });

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-checkbox-circle-line" />
            <ItemText>Confirm Order</ItemText>
          </ItemPod>

          <Icon className="ri-arrow-down-s-line" />

          {/* 
          //TODOS
          //What you'll pay today -activeTab.scheduleSelected[0].amount
          //How you'll pay - preferredCard or spending balance
          // Preferred card is selected by default [if change is tapped, list all the cards available : onClick of a list item, setSelectedCard to item]
          //If spending balance is selected - Fetch virtual account number

          */}
        </Top>
        <Wrapper>
          <ContentBox>
            <InnerContent>
              <StyledTitle>What you will pay</StyledTitle>
              <AmountContainer>NGN 3,000</AmountContainer>
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
                        className={`${
                          selectedOrderMethod === 'Card'
                            ? 'ri-checkbox-circle-fill'
                            : 'ri-checkbox-blank-circle-line'
                        } `}
                      />
                      <Row>
                        <Image
                          src={'/images/mastercard logo.svg'}
                          height={40}
                          width={40}
                          alt="card_issuer"
                        />
                        <PayTitle> •••• 1050 12/2025</PayTitle>
                      </Row>
                    </Row>
                    {showCardList || (
                      <ChangeBtn onClick={() => setShowCardList(!showCardList)}>
                        Change
                      </ChangeBtn>
                    )}
                  </PaymentMethod>

                  {showCardList && (
                    <Bottom>
                      <Card onClick={() => setShowCardList(!showCardList)} />
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                    </Bottom>
                  )}
                </PaymentMethodInner>

                <PaymentMethodInner>
                  <PaymentMethod>
                    <Row>
                      <PaymentIcon
                        className={`${
                          selectedOrderMethod !== 'Card'
                            ? 'ri-checkbox-circle-fill'
                            : 'ri-checkbox-blank-circle-line'
                        } `}
                      />
                      <Column>
                        <PayTitle>Spending balance</PayTitle>
                        <ExtraText>NGN 120,000.00</ExtraText>
                      </Column>
                    </Row>
                    <NewTag>New</NewTag>
                  </PaymentMethod>
                  <>Bottom</>
                </PaymentMethodInner>
              </PaymentMethodContainer>
            </InnerContent>
          </ContentBox>
        </Wrapper>
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Confirmer;
