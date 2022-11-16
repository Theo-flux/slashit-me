import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchCards,
  GetAuthorisationAddCard,
} from '../../../../../api/transactionAPI';
import {
  CliqueAccept,
  FetchUserById,
  NewRegister,
} from '../../../../../api/userAPI';
import {
  EncryptData,
  FormatCardNumber,
  FormatExpirationDate,
} from '../../../../../helpers/debitCardValidator';
import { setUser } from '../../../../../store/reducers/auth';
import {
  setCards,
  setPreferredCard,
} from '../../../../../store/reducers/transaction';
import { AddCard } from '../../../../../api/transactionAPI';
import { setAnyTab, setCardData } from '../../../../../store/reducers/helper';
import { Button } from '../../../../../shared';
import { ButtonWrapper } from '../../storeStyle';
import statusCode from '../../../../../api/statusCode';

function CardDetails() {
  let toastMsg = '';
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [PIN, setPIN] = useState();
  const [OTP, setOTP] = useState();
  const [description, setDescription] = useState('Enter your card details');
  const cardData = useSelector((state) => state.helper.cardData);
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const user = useSelector((state) => state.userAuth.user);
  const email = useSelector((state) => state.userAuth.userEmail);
  let currencyShortCode = user?.currencyShortCode;
  const [disabled, setdisabled] = useState(true);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [CVV, setCVV] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mode, setMode] = useState('');

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  function cleanUp() {
    setCVV('');
    setCardNumber('');
    setExpiration('');
    setLoading(false);
    setPIN('');
    setOTP('');
    setdisabled(true);
    dispatch(setCardData());
  }

  useEffect(() => {
    if (cardNumber && expiration && CVV) {
      if (
        cardNumber.length >= 16 &&
        expiration.length == 5 &&
        CVV.length >= 3
      ) {
        setdisabled(false);
      } else {
        setdisabled(true);
      }
    }
  }, [expiration, cardNumber, CVV]);

  useEffect(() => {
    //PIN
    if (mode == 'PIN') {
      setDescription('Enter card PIN');
      if (PIN && PIN.length == 4) {
        setdisabled(false);
        setbuttonTitle('Confirm PIN');
      } else {
        setdisabled(true);
      }
    }
    //OTP
    if (mode == 'OTP') {
      if (OTP && OTP.length >= 4) {
        setdisabled(false);
      } else {
        setdisabled(true);
      }
    }
    if (mode == 'NEW_WINDOW') {
      //TODO - Open data?.meta?.authorization?.redirect in another window
    }
  }, [PIN, OTP, mode]);

  function formatExpirationDate(string) {
    setExpiration(FormatExpirationDate(string));
    return;
  }

  function formatCardNumber(number) {
    setCardNumber(FormatCardNumber(number));
    return;
  }

  //async functions
  async function fetchUser() {
    if (!user.country) {
      const fetchData = await FetchUserById();
      if (fetchData.success) {
        dispatch(setUser(fetchData.user));
      }
    }
    if (!preferredCard) {
      let cardReq = await FetchCards(true);
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(setCards(cardReq.result));
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      }
    }
    return;
  }

  async function ValidateCard() {
    setLoading(true);

    let expiry_array = expiration.split('/');

    let cardData;

    cardData = {
      card_number: cardNumber.replace(/\s+/g, ''),
      cvv: CVV,
      expiry_month: expiry_array[0],
      expiry_year: expiry_array[1],
      currency: currencyShortCode,
      amount: 100,
      email: user.email,
      fullname: `${user.firstname} ${user.lastname}`,
      tx_ref: uuidv4(),
      redirect_url: 'https://shoplens.herokuapp.com/success', //Change on production
    };

    dispatch(setCardData(cardData));

    const encrypted = EncryptData(
      process.env.FLUTTERWAVE_KEY,
      JSON.stringify(cardData),
    );
    console.log('encrypted', encrypted);
    await Authorisation(encrypted);
    setLoading(false);
    return;
  }

  async function Authorisation(encrypted) {
    const data = await CheckAuthorisationAddCard(encrypted, user._id);
    let res = JSON.parse(data);
    if (res.success) {
      if (res.actionRequired) {
        if (res.meta.authorization.mode === 'pin') {
          setData(res);
          setMode('PIN');
          setDescription('Enter your Card PIN and press continue.');
        }
        if (res.meta.authorization.mode === 'redirect') {
          setData(res);
          setMode('REDIRECT');
        }
      } else {
        fetchUser();
        dispatch(
          setAnyTab({
            page: 'Confirmer',
            params: {
              code: statusCode.OK,
            },
          }),
        );
        cleanUp();
      }
    } else {
      toastMsg = res.message || '';
    }
    return;
  }

  async function ValidatePIN() {
    if (!user.country) {
      return;
    }
    setLoading(true);
    let PINData = {
      ...cardData,
      authorization: {
        mode: 'pin',
        pin: parseFloat(PIN),
      },
    };

    const encrypted = EncryptData(
      process.env.FLUTTERWAVE_KEY,
      JSON.stringify(PINData),
    );

    const data = await GetAuthorisationAddCard(encrypted, user._id);

    let res = JSON.parse(data);
    if (res.success) {
      if (res.actionRequired) {
        if (res?.meta?.authorization?.mode === 'otp') {
          toastMsg = res?.message || '';
          setMode('OTP');
          setData(res);
          setDescription(res.message);
        }

        if (res?.meta?.authorization?.mode === 'redirect') {
          setData(res);
          setMode('REDIRECT');
        }
      } else {
        fetchUser();
        dispatch(
          setAnyTab({
            page: 'Confirmer',
            params: {
              code: statusCode.OK,
            },
          }),
        );
        cleanUp();
      }
    } else {
      setData(res);
      toastMsg = res?.message || '';
    }
    setLoading(false);
    return;
  }

  async function ValidateOTP() {
    setLoading(true);
    const msg = await AddCard(data?.initiateChargeId, OTP);
    if (msg.success) {
      fetchUser();
      dispatch(
        setAnyTab({
          page: 'Confirmer',
          params: {
            code: statusCode.OK,
          },
        }),
      );
      cleanUp();
    } else {
      toastMsg = msg.message || '';
    }
    setLoading(false);
    return;
  }

  async function createAccount() {
    let register = await NewRegister({
      firstname,
      lastname,
      country: 'NG',
      email,
      role: 'shopper',
      ipAddress: computerInfo?.ip,
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    });
    if (register.success) {
      dispatch(setAnyTab({ page: 'VerifyEmailNext', params: {} }));
    } else {
      toastMsg = register.message;
    }
  }

  function btnPress() {
    if (!user.country) {
      fetchUser();
      toastMsg = 'Please refresh this page';
      return;
    }

    if (!isLoggedIn) {
      createAccount();
      return;
    }

    if (loading) return;
    if (mode == 'PIN') {
      ValidatePIN();
      return;
    }
    if (mode == 'OTP') {
      ValidateOTP();
      return;
    }
    ValidateCard();
    return;
  }

  return (
    <>
      <div>Card details</div>
      <ButtonWrapper>
        <Button disabled={disabled} onClick={() => btnPress()} width={`100%`}>
          Continue
        </Button>
      </ButtonWrapper>
    </>
  );
}

export default CardDetails;
