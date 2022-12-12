import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckAuthorisationAddCard,
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
import { setSignUpInfo, setUser } from '../../../../../store/reducers/auth';
import {
  setCards,
  setPreferredCard,
} from '../../../../../store/reducers/transaction';
import { AddCard } from '../../../../../api/transactionAPI';
import {
  setCardData,
  setCardCvv,
  setCardExpiry,
  setCardNumber,
} from '../../../../../store/reducers/helper';
import {
  CardInputContainer,
  InputContainer,
  Checker,
  Button,
} from '../../../../../shared';
import { InnerContainer, ContainerRow } from '../../../../home/pay/payStyles';
import { Column, StyledTitle } from '../../../../forms/formStyles';
import { ButtonWrapper } from '../../storeStyle';
import statusCode from '../../../../../api/statusCode';
import {
  useLoading,
  useLocalStorage,
  useTabs,
  useToast,
} from '../../../../../hooks';
import { cardItems, personal_item } from '../../../../../utils/helper';
import { v4 as uuidv4 } from 'uuid';

const Padder = styled.div`
  padding: 1rem 2rem;
`;

function CardDetails() {
  const {
    activeTab,
    anyAction,
    extraTab,
    anySuccess,
    setActiveTab,
    setAnyAction,
    setExtraTab,
  } = useTabs();

  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [PIN, setPIN] = useState();
  const [OTP, setOTP] = useState();
  const [description, setDescription] = useState('Enter your card details');
  const cardData = useSelector((state) => state.helper.cardData);
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);
  const userFirstname = useSelector((state) => state.userAuth.userFirstname);
  const userLastname = useSelector((state) => state.userAuth.userLastname);
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const user = useSelector((state) => state.userAuth.user);
  const inputEmail = useSelector((state) => state.userAuth.userEmail);
  let currencyShortCode = user?.currencyShortCode;
  const [disabled, setdisabled] = useState(true);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const { session, ping } = useLocalStorage();
  const [toastOptions, toast] = useToast();
  const [loading, setLoading] = useLoading();
  const cardNumber = useSelector((state) => state.helper.cardNumber);
  const expiration = useSelector((state) => state.helper.cardExpiry);
  const CVV = useSelector((state) => state.helper.cardCvv);
  const [mode, setMode] = useState('');
  const [buttonTitle, setbuttonTitle] = useState('Continue');
  const [checked, setChecked] = useState(false);

  function cleanUp() {
    dispatch(setCardCvv(''));
    dispatch(setCardNumber(''));
    dispatch(setCardExpiry(''));
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
        CVV.length >= 3 &&
        userFirstname &&
        userLastname &&
        checked
      ) {
        setdisabled(false);
      } else {
        setdisabled(true);
      }
    }
  }, [expiration, cardNumber, CVV, userFirstname, userLastname, checked]);

  useEffect(() => {
    //PIN
    if (mode == 'PIN') {
      setDescription('Enter your card PIN');
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
        setActiveTab({
          page: 'Confirmer',
          params: {
            code: statusCode.OK,
          },
        });
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

        setActiveTab({
          page: 'Confirmer',
          params: {
            code: statusCode.OK,
          },
        });
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
      setActiveTab({
        page: 'Confirmer',
        params: {
          code: statusCode.OK,
        },
      });
      cleanUp();
    } else {
      toastMsg = msg.message || '';
    }
    setLoading(false);
    return;
  }

  async function createAccount() {
    let register = await NewRegister({
      firstname: userFirstname,
      lastname: userLastname,
      country: 'NG',
      email: inputEmail,
      role: 'shopper',
      ipAddress: computerInfo?.ip,
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    });
    if (register.success) {
      setExtraTab({ page: 'VerifyEmailNext', params: {} });
    } else {
      toast({ text: register.message, textColor: '#fff' });
    }
  }

  function btnPress() {
    if (!user.country) {
      fetchUser();
      // toast({
      //   text: 'Please refresh this page',
      //   textColor: '#fff',
      // });
      return;
    }

    if (!session && inputEmail) {
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

  console.log(cardNumber, CVV, expiration, userFirstname, userLastname);

  return (
    <Padder>
      <InnerContainer>
        <StyledTitle>{description}</StyledTitle>
        <Column>
          {cardItems.slice(0, 1).map((item, index) => {
            const {
              id,
              type,
              src,
              placeholder,
              legend,
              name,
              maxlength,
              value,
            } = item;
            return (
              <CardInputContainer
                key={index}
                name={name}
                id={id}
                type={type}
                src={src}
                value={value}
                placeholder={placeholder}
                legend={legend}
                maxlength={maxlength}
              />
            );
          })}

          <ContainerRow>
            {cardItems.slice(1).map((item, index) => {
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
            check={() => setChecked(!checked)}
            content={`
                    By continuing, you agree to Slashit’s terms of use and privacy policy.
                    We’ll send reminders about debts on your account to friends in your Clique and
                    you’ll receive reminders about any debts on their account. We may charge debts
                    on their account to you at anytime and charge debts on your account to them at anytime.
                `}
          />
        </Column>
      </InnerContainer>
      <ButtonWrapper>
        <Button
          disabled={disabled}
          // onClick={() => btnPress()}
          onClick={() => setExtraTab({ page: 'VerifyEmailNext' })}
          width={`100%`}
        >
          {buttonTitle}
        </Button>
      </ButtonWrapper>
    </Padder>
  );
}

export default CardDetails;
