import { useState } from 'react';
import { Button } from '../../../shared';
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
} from './storeStyle';
import Confirmer from './confirmer/Confirmer';
import Orderer from './orderer/Orderer';
import Scheduler from './scheduler/Scheduler';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setComputerInfo, setEmail } from '../../../store/reducers/auth';
import { AmountSeparator } from '../../../helpers/numberValidation';
import { CreateOrder } from '../../../api/transactionAPI';
import { setOrderDetails } from '../../../store/reducers/transaction';
import { ShopperExist } from '../../../api/userAPI';
import statusCode from '../../../api/statusCode';

const orderMethods = ['API', 'LINK'];

function Store() {
  const router = useRouter();
  let toastMsg = '';

  const dispatch = useDispatch();
  const [openOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderer, setOrderer] = useState({
    email: '',
    password: '',
  });
  const [pass, setPass] = useState('');
  const [error, setError] = useState({});
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const [isMailValidated, setIsMailValidated] = useState(false);

  if (typeof window !== 'undefined') {
    let platform = window.navigator.platform;
    let os = window.navigator.appVersion;
    os = os.split(' ');
    os = `${os[2]} ${os[3]}`;
    dispatch(setComputerInfo({ ...computerInfo, platform, os }));
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
      // setShowPass(false);
    } else {
      setShowPass(true);
    }
  }

  useEffect(() => {
    createOrder();
    GetComputerIp();
  }, [router.query]);

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(setOrderDetails());
    };
  }, []);

  //async functions
  async function validateShopper() {
    setLoading(true);
    dispatch(setEmail(orderer.email)); //Store email in global state
    let sendReq = await ShopperExist(orderer.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        setPass(statusCode.COMPLETE_REGISTRATION);
      } else if (sendReq.code == statusCode.OK) {
        setPass(statusCode.OK);
      }
    } else {
      setPass(statusCode.UNAUTHORIZED);
    }
    setIsMailValidated(true);
    setLoading(false);
    return;
  }

  async function createOrder() {
    let sendReq = await CreateOrder(
      router.query?.orderMethod == 'API'
        ? router.query?.orderInput
        : { amount: '', currency: '' }, //router.query.orderInput or a dummy object to prevent server type errors
      router.query?.orderMethod,
      router.query?.link || '6305313baea30a002c977d3f', //router.query.link or a constant to prevent server type errors
    );
    if (sendReq.success) {
      dispatch(setOrderDetails(sendReq.order));
    } else {
      toastMsg = '';
    }
  }

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setComputerInfo({ ...computerInfo, ip: data?.ip || '' }));
  }

  function resetOrderer() {
    setOrderer({
      email: '',
      password: '',
    });
    setIsMailValidated(false);
  }

  if (!orderDetails)
    return {
      /* <>{Return circular loader}</> */
    };

  return (
    <StoreContainer>
      <StoreWrapper>
        <ProfileContainer>
          <Profile>
            <ProfileImg
              src={orderDetails?.businessAvatar || '/images/profile.png'}
              alt="merchant-logo"
            />

            <ProfileInfo>
              <ProfileName>{orderDetails.businessName || ''}</ProfileName>
              <ProfileMail>{orderDetails.businessEmail || ''}</ProfileMail>
            </ProfileInfo>
          </Profile>

          <OrderPrice>
            <sup>{orderDetails?.currency}</sup>{' '}
            {AmountSeparator(orderDetails.amount)}
          </OrderPrice>
        </ProfileContainer>

        <ProcessWrapper>
          <Orderer
            openOrder={openOrder}
            error={error}
            handleOrdererOnchange={handleOrdererOnchange}
            orderer={orderer}
            isMailValidated={isMailValidated}
            resetOrderer={resetOrderer}
            pass={pass}
          />
          <Scheduler />
          <Confirmer />
        </ProcessWrapper>

        <ButtonWrapper>
          {openOrder || (
            <Button onClick={() => setOpenOrder(true)} width={`100%`}>
              Pay now
            </Button>
          )}

          {openOrder && (
            <Button onClick={() => handleEmailContinue()} width={`100%`}>
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