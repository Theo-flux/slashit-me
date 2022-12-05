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
  PlayerWrapper,
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
  setUser,
} from '../../../store/reducers/auth';
import { AmountSeparator } from '../../../helpers/numberValidation';
import { CreateOrder, FetchCards } from '../../../api/transactionAPI';
import {
  setOrderDetails,
  setPreferredCard,
} from '../../../store/reducers/transaction';
import { Login, ShopperExist } from '../../../api/userAPI';
import statusCode from '../../../api/statusCode';
import CardDetails from './confirmer/card/cardDetails';
import Success from './success/Success';
import VerifyEmailNext from './confirmer/card/verifyEmail';
import VerifyEmail from './orderer/otp';
import { Player } from '@lottiefiles/react-lottie-player';
import { addDays } from '../../../helpers/dates';
import { useLocalStorage, useTabs } from '../../../hooks';

function Store() {
  const parser = new UAParser();
  const { vendor, model, type } = parser.getDevice();
  const { name, version } = parser.getOS();
  const router = useRouter();

  const {
    activeTab,
    anyAction,
    extraTab,
    anySuccess,
    setActiveTab,
    setAnyAction,
    setExtraTab,
    setAnySuccess,
  } = useTabs();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { session, } = useLocalStorage();
  const inputEmail = useSelector((state) => state.userAuth.userEmail);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const scheduleSelected = useSelector(
    (state) => state.helper.scheduleSelected,
  );
  let platform = vendor && model && type ? `${vendor} ${model}, ${type}` : '';
  let os = `${name} ${version}`;
  let splitIn3 = (orderDetails?.amount / 3).toFixed(2);

  const scheduleIn4 = [
    {
      text: '1',
      value: 25,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due today`,
    },
    {
      text: '2',
      value: 50,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(14, 'MMM DD')}`,
    },
    {
      text: '3',
      value: 75,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(28, 'MMM DD')}`,
    },
    {
      text: '4',
      value: 100,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(42, 'MMM DD')}`,
    },
  ];

  const scheduleIn3 = [
    {
      text: '1',
      value: 33.3,
      amount: splitIn3,
      date: `Due today`,
    },
    {
      text: '2',
      value: 66.6,
      amount: splitIn3,
      date: `Due ${addDays(30, 'MMM DD')}`,
    },
    {
      text: '3',
      value: 99.9,
      amount: (orderDetails?.amount - splitIn3 * 2).toFixed(2),
      date: `Due ${addDays(60, 'MMM DD')}`,
    },
  ];

  useEffect(() => {
    dispatch(setComputerInfo({ ...computerInfo, platform, os }));
  }, [platform, os]);

  useEffect(() => {
    GetComputerIp();
  }, []);

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(setOrderDetails());
      setActiveTab();
    };
  }, []);

  //async functions
  //Create Order plus Fetch Order details on component render
  async function createOrder() {
    if (router.query?.method) {
      let sendReq = await CreateOrder(
        router.query?.input,
        router.query?.method,
        router.query?.link,
      );
      if (sendReq?.success) {
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
  }

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setComputerInfo({ ...computerInfo, ip: data?.ip || '' }));
  }

  function CtrlStore() {
    //If not activeTab
    if (!activeTab) {
      //If input email
      if (inputEmail) {
        if (session) {
          setActiveTab({
            page: 'Confirmer',
            params: {
              scheduleSelected,
              schedule:
                scheduleSelected == 'PayIn4' ? scheduleIn4 : scheduleIn3,
            },
          });

          return;
        } else {
          setExtraTab({
            page: 'CardDetails',
          });
          return;
        }
      } else {
        setActiveTab({
          page: 'Orderer',
        });
        setAnyAction(true);
        setTimeout(() => {
          setAnyAction(false);
        }, 50);
        return;
      }
    }

    //activeTab.page is Orderer
    if (activeTab?.page == 'Orderer') {
      if (inputEmail) {
        if (session) {
          setActiveTab({
            page: 'Scheduler',
            params: {},
          });
          console.log('lala')
          return;
        } else {
          setAnyAction(true);
          setTimeout(() => {
            setAnyAction(false);
          }, 50);
          console.log('lal2')
          return;
        }
      } else {
        setAnyAction(true);
        setTimeout(() => {
          setAnyAction(false);
        }, 50);
        return;
      }
    }
    //Navigate to Confimer if activeTab.page is Scheduler
    if (activeTab?.page == 'Scheduler') {
      setActiveTab({
        page: 'Confirmer',
      });
      return;
    }
  }

  useEffect(() => {
    createOrder();
  }, [router?.query]);

  console.log(inputEmail,session, 'passed store' );

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
              <Confirmer
                scheduleSelected={
                  scheduleSelected == 'PayIn4' ? scheduleIn4 : scheduleIn3
                }
              />
            </>
          ) : (
            <>
              {extraTab?.page == 'VerifyEmail' && <VerifyEmail />}
              {extraTab?.page == 'VerifyEmailNext' && <VerifyEmailNext />}
              {extraTab?.page == 'CardDetails' && <CardDetails />}
              {extraTab?.page == 'Success' && <Success />}
            </>
          )}
          {/* <Confirmer /> */}
        </ProcessWrapper>

        {!extraTab && (
          <ButtonWrapper>
            <Button onClick={CtrlStore} width={`100%`}>
              Confirm
            </Button>
          </ButtonWrapper>
        )}
      </StoreWrapper>

      <PlayerWrapper>
        <Player
          src={require('../../../../public/lottieFiles/confetti.json')}
          speed={0.5}
          autoPlay
          loop={false}
          style={{ height: '300px', width: '300px' }}
        />
      </PlayerWrapper>
    </StoreContainer>
  );
}

export default Store;

//TODO - If ismailvalidated & pass is COMPLETE_REGISTRATION, show enter the code sent to your email .
