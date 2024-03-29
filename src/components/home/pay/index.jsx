import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import statusCode from '../../../api/statusCode';
import { FetchCards, PayAnyone } from '../../../api/transactionAPI';
import { Login, ShopperExist, VerifyEmail } from '../../../api/userAPI';
import { addDays } from '../../../helpers/dates';
import { useLocalStorage, useToast } from '../../../hooks';
import { Button, InputContainer } from '../../../shared';
import { setEmail, setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import { setAnyAction } from '../../../store/reducers/helper';
import { setPreferredCard } from '../../../store/reducers/transaction';
import CardDetailsCmpt from './cardDetails';
import Otp from './otp';
import {
  PayForm,
  PaySection,
  InfoBox,
  Icon,
  Row,
  Col,
  InfoBoxRow,
  InfoText,
  SmallBtn,
  IntsallmentsContainer,
  ProgressText,
  CardContainer,
  Amount,
  Date,
  Intsallment4,
  Aligner,
  ChargedToRow,
  ProfileContainer,
  ProfileImageContainer,
  ProfileName,
} from './payStyles';
import Pin from './pin';
import Redirect from './redirect';
import Success from './success';

const scheduleIn4 = [
  {
    value: '25',
    text: '1',
    amount: 'NGN 2,000.00',
    date: `Due today`,
  },
  {
    value: '50',
    text: '2',
    amount: 'NGN 2,000.00',
    date: `Due Sept 24`,
  },
  {
    value: '75',
    text: '3',
    amount: 'NGN 2,000.00',
    date: `Due Oct 8`,
  },
  {
    value: '100',
    text: '4',
    amount: 'NGN 2,000.00',
    date: `Due Oct 22`,
  },
];

const Card = ({ data }) => {
  const { value, text, amount, date } = data;
  return (
    <CardContainer>
      <div>
        <Date>{date}</Date>
        <Amount>{amount}</Amount>
      </div>

      <div
        style={{
          width: '50px',
          height: '50px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <CircularProgressbarWithChildren
            value={value}
            strokeWidth={5}
            styles={buildStyles({
              strokeLinecap: 'round',
              pathColor: `#1d1d1d`,
              trailColor: 'white',
            })}
          >
            <Aligner>
              <ProgressText>
                {text}
                <sup>
                  {text === '1'
                    ? 'st'
                    : text === '2'
                    ? 'nd'
                    : text === '3'
                    ? 'rd'
                    : 'th'}
                </sup>
              </ProgressText>
            </Aligner>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </CardContainer>
  );
};

function Pay(props) {
  const dispatch = useDispatch();
  let toastMsg = '';
  const [loading, setLoading] = useState(false); //Use circular loading indicator
  const [showInstallments, setShowInstallments] = useState(false);
  const [isMailValidated, setIsMailValidated] = useState(false);
  const [toastOptions, toast] = useToast();
  const { setSession } = useLocalStorage();
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const [error, setError] = useState('');
  const [mode, setMode] = useState(''); // VERIFY_EMAIL, VERIFY_EMAIL_NEXT, CARD_DETAILS, PIN, OTP, REDIRECT, SUCCESS
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const [form, setForm] = useState({
    amount: '',
    recipient: '',
    email: '',
    password: '',
  });

  function handleFormOnchange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleEmailSubmit() {
    let errors = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!form.email) {
      errors.email = "Email can't be empty!";
    } else if (!form.email.match(mailformat)) {
      errors.email = 'Invalid email!';
    } else {
      errors = {};
    }

    if (errors.email) {
      setError(errors);
    } else {
      validateShopper();
    }
  }

  function handlePasswordSubmit() {
    let errors = {};

    if (!form.password) {
      errors.password = 'Enter password!';
    } else {
      errors = {};
    }

    if (errors.password) {
      setError(errors);
    } else {
      login();
    }
  }

  //async functions
  async function validateShopper() {
    setLoading(true);
    dispatch(setEmail(form.email)); //Store email in global state
    let sendReq = await ShopperExist(form.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        setMode('VERIFY_EMAIL');
      } else if (sendReq.code == statusCode.OK) {
        setIsMailValidated(true);
      }
    } else {
      setMode('CARD_DETAILS');
    }
    setLoading(false);
    return;
  }

  async function login() {
    setLoading(true);
    let userInfo = {
      email: form.email,
      password: form.password,
      platform: 'web',
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    };

    let sendReq = await Login(userInfo);
    if (sendReq.success) {
      setSession({ userInfo, token: sendReq.token, session: true });
      dispatch(setUser(sendReq.user));
      let cardReq = await FetchCards((showFew = true));
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
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

  async function payBtn() {
    //Pay anyone
    let pay = await PayAnyone(
      (currency = 'NGN'),
      parseFloat(form.amount),
      form?.recipient,
      (source = 'Card'),
    );
    if (pay.success) {
      dispatch(setAnyAction({ success: pay.success, message: pay.message }));
      setMode('SUCCESS');
    } else {
      if (pay.code == statusCode.ADD_YOUR_CARD) {
        //Open Pay anyone 4 -card details
        setMode('CARD_DETAILS');
      } else {
        toastMsg = pay.message;
      }
    }
  }
  function resetBox() {
    setMode('');
    dispatch(setEmail());
    dispatch(setAnyAction());
    return;
  }

  if (mode == 'CARD_DETAILS')
    return (
      <CardDetailsCmpt
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //CARD DETAILS UI∆

  if (mode == 'VERIFY_EMAIL')
    return (
      <CardDetailsCmpt
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //VERIFY EMAIL

  if (mode == 'VERIFY_EMAIL_NEXT')
    return (
      <CardDetailsCmpt
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //VERIFY EMAIL NEXT

  if (mode == 'REDIRECT')
    return (
      <Redirect
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //REDIRECT UI

  if (mode == 'PIN')
    return (
      <Pin
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //PIN UI

  if (mode == 'OTP')
    return (
      <Otp
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //OTP UI

  if (mode == 'SUCCESS')
    return (
      <PayForm>
        <Success
          mode={mode}
          setMode={setMode}
          isLoggedIn={isLoggedIn}
          resetBox={resetBox}
        />
      </PayForm>
    ); //SUCCESS UI

  // const scheduleIn4 = [
  //   {
  //     amount: (form.amount / 4).toFixed(2),
  //     date: `Due today`,
  //   },
  //   {
  //     amount: (form.amount / 4).toFixed(2),
  //     date: `Due ${addDays(14, 'MMM DD')}`,
  //   },
  //   {
  //     amount: (form.amount / 4).toFixed(2),
  //     date: `Due ${addDays(28, 'MMM DD')}`,
  //   },
  //   {
  //     amount: (form.amount / 4).toFixed(2),
  //     date: `Due ${addDays(42, 'MMM DD')}`,
  //   },
  // ];

  return (
    <PayForm>
      <PaySection>
        <InputContainer
          legend={`Amount to pay`}
          id={'amount-to-pay'}
          type={'text'}
          placeholder={'NGN 8000'}
        />

        <InputContainer
          legend={`Recepient mail`}
          id={'mail'}
          type={'email'}
          placeholder={'receivermail@gmail.com'}
        />

        {isLoggedIn ? (
          <ProfileContainer>
            <ProfileImageContainer>
              <Image
                src={user.avatar}
                height={50}
                width={50}
                alt={'user-avatar'}
              />
            </ProfileImageContainer>
            <ProfileName>
              {user.firstname} {user.lastname}
            </ProfileName>
          </ProfileContainer>
        ) : (
          <div>
            <InputContainer
              legend={`Your mail`}
              id={'your-mail'}
              type={'email'}
              placeholder={'youremail@gmail.com'}
            />
            <InfoBox>
              <Icon className="fa-solid fa-circle-info"></Icon>
              Use your Slashit email address if you have a Slashit account
            </InfoBox>
          </div>
        )}

        {isMailValidated && (
          <InfoBoxRow>
            <Icon className="fa-solid fa-circle-info"></Icon>
            <InfoText>{form?.email}</InfoText>
            <SmallBtn>Not you?</SmallBtn>
          </InfoBoxRow>
        )}
      </PaySection>

      <PaySection>
        <Row onClick={() => setShowInstallments(!showInstallments)}>
          <div>How you’ll pay</div>
          <div>
            4 x installments <i className="fa-solid fa-caret-down"></i>
          </div>
        </Row>

        {showInstallments && (
          <IntsallmentsContainer>
            <Intsallment4>
              {scheduleIn4.map((data, index) => {
                return <Card key={index} data={data} />;
              })}
            </Intsallment4>

            <Row>
              <div>Charged to</div>
              <ChargedToRow>
                <Image
                  src={'/images/mastercard logo.svg'}
                  height={30}
                  width={30}
                  alt="card"
                />
                <div>••••4242</div>
                <div> 09/2026</div>
              </ChargedToRow>
            </Row>
          </IntsallmentsContainer>
        )}

        <Row>
          <div>Recipient gets within minutes</div>
          <div>NGN 8000</div>
        </Row>
      </PaySection>

      <PaySection>
        <Row>
          <div>Due Today</div>
          <div>NGN 8000</div>
        </Row>
        <Col>
          <Button
            onClick={() => {
              if (preferredCard) {
                payBtn();
              } else {
                !isMailValidated ? handleEmailSubmit() : handlePasswordSubmit();
              }
            }}
            bg={'var(--violet)'}
          >
            Pay NGN 2000
          </Button>
        </Col>
      </PaySection>
    </PayForm>
  );
}

export default Pay;
