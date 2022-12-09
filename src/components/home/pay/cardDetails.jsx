import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FetchCards,
  GetAuthorisationAddCard,
} from '../../../api/transactionAPI';
import {
  CliqueAccept,
  FetchUserById,
  NewRegister,
  VerifyEmail,
} from '../../../api/userAPI';
import {
  EncryptData,
  FormatCardNumber,
  FormatExpirationDate,
} from '../../../helpers/debitCardValidator';
import { setUser } from '../../../store/reducers/auth';
import {
  setCards,
  setPreferredCard,
} from '../../../store/reducers/transaction';
import { AddCard } from '../../../api/transactionAPI';
import { ButtonWrapper } from '../../checkout/store/storeStyle';
import { CardForm } from '../../forms';
import {
  CardInputContainer,
  InputContainer,
  Checker,
  Button,
} from '../../../shared';
import { Column, StyledTitle } from '../../forms/formStyles';
import {
  PayForm,
  Container,
  InnerContainer,
  IconCancel,
  ContainerRow,
} from './payStyles';
import EnterEmailCode from './verifyEmail';
import EnterEmailCodeNext from './verifyEmailNext';

const cardItems = [
  {
    id: 'card_number',
    name: 'cardNumber',
    type: 'text',
    src: '/images/card_number.svg',
    placeholder: 'xxxx xxxx xxxx xxxx',
    legend: 'Card number',
    maxlength: 19,
  },

  {
    id: 'card_expiry',
    name: 'cardExpiry',
    type: 'text',
    src: '/images/card_expiry.svg',
    placeholder: '01/22',
    legend: 'Expiry',
    maxlength: 5,
  },

  {
    id: 'card_cvv',
    name: 'cardCvv',
    type: 'text',
    src: '/images/card_cvv.svg',
    placeholder: '123',
    legend: 'CVV',
    maxlength: 3,
  },
];

const personal_item = [
  {
    type: 'text',
    legend: 'First Name',
    id: 'first_name',
    name: 'firstname',
  },

  {
    type: 'text',
    legend: 'Last Name',
    id: 'last_name',
    name: 'lastname',
  },
];

function CardDetailsCmpt({ mode, setMode, resetBox }) {
  let toastMsg = '';
  const dispatch = useDispatch();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [CVV, setCVV] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [disabled, setdisabled] = useState(true);
  const [buttonTitle, setbuttonTitle] = useState('Add Card');
  const cardData = useSelector((state) => state.helper.cardData);
  const [data, setData] = useState('');
  const [PIN, setPIN] = useState();
  const [OTP, setOTP] = useState();
  const [description, setDescription] = useState('Enter your card details');
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const user = useSelector((state) => state.userAuth.user);
  const email = useSelector((state) => state.userAuth.userEmail);
  let currencyShortCode = user?.currencyShortCode;

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
    setbuttonTitle('Add Card');
    setMode('');
    dispatch(setCardData());
  }

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

  function formatExpirationDate(string) {
    setExpiration(FormatExpirationDate(string));
    return;
  }

  function formatCardNumber(number) {
    setCardNumber(FormatCardNumber(number));
    return;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (cardNumber && expiration && CVV) {
      if (
        cardNumber.length >= 16 &&
        expiration.length == 5 &&
        CVV.length >= 3
      ) {
        setdisabled(false);
        setbuttonTitle('Add Card');
      } else {
        setdisabled(true);
        setbuttonTitle('Add Card');
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
        setbuttonTitle('Confirm OTP');
      } else {
        setdisabled(true);
      }
    }
    if (mode == 'NEW_WINDOW') {
      //TODO - Open data?.meta?.authorization?.redirect in another window
    }
  }, [PIN, OTP, mode]);

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
          toastMsg = 'Enter your Card PIN to continue.';
        }
        if (res.meta.authorization.mode === 'redirect') {
          setData(res);
          setMode('REDIRECT');
          //   setTimeout(() => {
          //     setMode('NEW_WINDOW');
          //   }, 2500);
        }
      } else {
        fetchUser();
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
          //   setTimeout(() => {
          //     setScreen('NEW_WINDOW');
          //   }, 2500);
        }
      } else {
        fetchUser();
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
      setMode('VERIFY_EMAIL_NEXT');
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
    <PayForm>
      <Container>
        <IconCancel onClick={() => resetBox()} className="ri-close-fill" />
        {/* {Card number} */}
        {/* {Card expiry} */}
        {/* {Card cvv} */}
        {/* {if isLoggedIn, hide firstname, lastname field and hide this text "We'll use your name to create an account for you on Slashit, so be real"} */}

        {mode === 'CARD_DETAILS' && (
          <InnerContainer>
            <StyledTitle>Enter your card details</StyledTitle>
            <Column>
              {cardItems.slice(0, 1).map((item, index) => {
                const { id, type, src, placeholder, legend, name, maxlength } =
                  item;
                return (
                  <CardInputContainer
                    key={index}
                    name={name}
                    id={id}
                    type={type}
                    src={src}
                    placeholder={placeholder}
                    legend={legend}
                    maxlength={maxlength}
                  />
                );
              })}

              <ContainerRow>
                {cardItems.slice(1).map((item, index) => {
                  const {
                    id,
                    type,
                    src,
                    placeholder,
                    legend,
                    name,
                    maxlength,
                  } = item;
                  return (
                    <CardInputContainer
                      key={index}
                      name={name}
                      id={id}
                      type={type}
                      src={src}
                      placeholder={placeholder}
                      legend={legend}
                      maxlength={maxlength}
                    />
                  );
                })}
              </ContainerRow>

              <ContainerRow>
                {personal_item.slice(0, 2).map((reg, index) => {
                  const { type, legend, placeholder, id, name } = reg;
                  return (
                    <InputContainer
                      key={index}
                      type={type}
                      legend={legend}
                      placeholder={placeholder}
                      id={id}
                      name={name}
                      onChange={(e) =>
                        dispatch(
                          setSignUpInfo({ ...signUpInfo, [e.name]: e.event }),
                        )
                      }
                    />
                  );
                })}
              </ContainerRow>

              <Checker
                content={`
                    By continuing, you agree to Slashit’s terms of use and privacy policy.
                    We’ll send reminders about debts on your account to friends in your Clique and
                    you’ll receive reminders about any debts on their account. We may charge debts
                    on their account to you at anytime and charge debts on your account to them at anytime.
                `}
              />

              <Button disabled={true} width={`100%`} bg={`var(--violet)`}>
                Pay NGN 2000
              </Button>
            </Column>
          </InnerContainer>
        )}
        {mode === 'VERIFY_EMAIL' && <EnterEmailCode />}
        {mode === 'VERIFY_EMAIL_NEXT' && <EnterEmailCodeNext />}
      </Container>
    </PayForm>
  );
}

export default CardDetailsCmpt;
