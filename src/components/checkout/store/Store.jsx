import { useState } from 'react';
import { UAParser } from 'ua-parser-js';
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

const extra = ['VerifyEmail', 'VerifyEmailNext', 'Card', 'Success'];

function Store() {
  const parser = new UAParser();
  const { vendor, model, type } = parser.getDevice();
  const { name, version } = parser.getOS();
  const router = useRouter();
  let toastMsg = '';

  const dispatch = useDispatch();
  const [openOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const inputEmail = useSelector((state) => state.userAuth.email);
  const activeTab = useSelector((state) => state.helper.anyTab);
  const extraTab = useSelector((state) => state.helper.extraTab);
  const anyAction = useSelector((state) => state.helper.anyAction);
  const anySuccess = useSelector((state) => state.helper.anySuccess);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  let platform = `${vendor} ${model}, ${type}`;
  let os = `${name} ${version}`;

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
  //Create Order plus Fetch Order details on component render
  async function createOrder() {
    let sendReq = await CreateOrder(
      router.query?.orderInput,
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

  async function CtrlStore() {
    //If not activeTab
    if (!activeTab) {
      dispatch(
        setAnyTab({
          page: 'Orderer',
        }),
      );
      return;
    }

    //Navigate to Scheduler if activeTab.page is Orderer
    if (activeTab?.page == 'Orderer') {
      if (inputEmail) {
        dispatch(
          setAnyTab({
            page: 'Scheduler',
          }),
        );
        return;
      } else {
        anyAction?.action();
        return;
      }
    }
    //Navigate to Confimer if activeTab.page is Scheduler
    if (activeTab?.page == 'Scheduler') {
      dispatch(
        setAnyTab({
          page: 'Confirmer',
        }),
      );
      return;
    }
  }

  console.log(activeTab);

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
          {!extraTab ? (
            <>
              <Orderer />
              <Scheduler />
              <Confirmer />
            </>
          ) : (
            <>
              {extraTab?.page == 'VerifyEmail' && <VerifyEmail />}
              {extraTab?.page == 'VerifyEmailNext' && <VerifyEmailNext />}
              {extraTab?.page == 'Card' && <CardDetails />}
              {extraTab?.page == 'Success' && <Success />}
            </>
          )}
        </ProcessWrapper>

        <ButtonWrapper>
          {!extraTab && (
            <Button onClick={CtrlStore} width={`100%`}>
              Confirm
            </Button>
          )}
        </ButtonWrapper>
      </StoreWrapper>
      {
        // anySuccess && <>{lottie}</>
      }
    </StoreContainer>
  );
}

export default Store;

//TODO - If ismailvalidated & pass is COMPLETE_REGISTRATION, show enter the code sent to your email .
