import { useState } from 'react';
import { Button, LoaderContainer, Loader } from '../../../shared';
import {
  StoreContainer,
  StoreWrapper,
  ProfileContainer,
  Profile,
  ProfileInfo,
  ProfileImg,
  ProfileName,
  ProfileMail,
  OrderPrice,
  ProcessWrapper,
  ButtonWrapper,
  LoaderWrapper,
} from './storeStyle';
import Confirmer from './confirmer/Confirmer';
import Orderer from './orderer/Orderer';
import Scheduler from './scheduler/Scheduler';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  setComputerInfo,
  setEmail,
  setIsLoggedIn,
  setUser,
} from '../../../store/reducers/auth';
import { AmountSeparator } from '../../../helpers/numberValidation';
import { CreateOrder, FetchCards } from '../../../api/transactionAPI';
import {
  setOrderDetails,
  setPreferredCard,
} from '../../../store/reducers/transaction';
import {
  Login,
  SaveLoginCredentials,
  ShopperExist,
} from '../../../api/userAPI';
import statusCode from '../../../api/statusCode';
import { setAnyTab } from '../../../store/reducers/helper';
import CardDetails from './confirmer/card/cardDetails';
import Success from './confirmer/success';
import VerifyEmailNext from './confirmer/card/verifyEmail';
import VerifyEmail from './orderer/otp';

function Store() {
  const router = useRouter();
  let toastMsg = '';

  const dispatch = useDispatch();
  const [openOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeTab = useSelector((state) => state.helper.anyTab);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  let platform;
  let os;

  if (typeof window !== 'undefined') {
    platform = window.navigator.platform;
    os = window.navigator.appVersion;
    os = os.split(' ');
    os = `${os[2]} ${os[3]}`;
  }

  useEffect(() => {
    dispatch(setComputerInfo({ ...computerInfo, platform, os }));
  }, [platform, os]);

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(setOrderDetails());
      dispatch(setAnyTab());
    };
  }, []);

  //async functions
  //Create Order or Fetch Order details on component render
  async function createOrder() {
    let sendReq = await CreateOrder(
      router.query?.orderMethod == 'API'
        ? router.query?.orderInput
        : { amount: '', currency: '' }, //router.query.orderInput or a dummy object to prevent server type errors
      router.query?.orderMethod,
      router.query?.link || '6305313baea30a002c977d3f', //router.query.link or a constant to prevent server type errors
    );
    if (sendReq.success) {
      dispatch(
        setOrderDetails({
          ...sendReq.order,
          paymentMethods: sendReq.paymentMethods,
        }),
      );
    } else {
      toastMsg = '';
    }
  }

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setComputerInfo({ ...computerInfo, ip: data?.ip || '' }));
  }

  if (!orderDetails)
    return (
      <StoreContainer>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </StoreContainer>
    );

  return (
    <StoreContainer>
      <StoreWrapper>
        <ProfileContainer>
          <Profile>
            <ProfileImg
              src={orderDetails?.businessAvatar}
              alt="merchant-logo"
            />
            <ProfileInfo>
              <ProfileName>{orderDetails?.businessName || ''}</ProfileName>
              <ProfileMail>{orderDetails?.businessEmail || ''}</ProfileMail>
            </ProfileInfo>
          </Profile>

          <OrderPrice>
            <sup>{orderDetails?.currency}</sup>{' '}
            {AmountSeparator(orderDetails?.amount)}
          </OrderPrice>
        </ProfileContainer>

        <ProcessWrapper>
          {!activeTab && <Orderer openOrder={openOrder} />}
          {activeTab?.page == 'Scheduler' && <Scheduler />}
          {activeTab?.page == 'Confirmer' && <Confirmer />}
          {activeTab?.page == 'VerifyEmail' && <VerifyEmail />}
          {activeTab?.page == 'VerifyEmailNext' && <VerifyEmailNext />}
          {activeTab?.page == 'Card' && <CardDetails />}
          {activeTab?.page == 'Success' && <Success />}
        </ProcessWrapper>

        <ButtonWrapper>
          {openOrder && (
            <Button
              onClick={() =>
                isMailValidated ? handlePasswordSubmit() : handleEmailContinue()
              }
              width={`100%`}
            >
              Continue
            </Button>
          )}
        </ButtonWrapper>
      </StoreWrapper>
    </StoreContainer>
  );
}

export default Store;

//TODO - If ismailvalidated & pass is COMPLETE_REGISTRATION, show enter the code sent to your email .
