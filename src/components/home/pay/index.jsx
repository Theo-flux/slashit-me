import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import statusCode from '../../../api/statusCode';
import { FetchCards, PayAnyone } from '../../../api/transactionAPI';
import {
  Login,
  SaveLoginCredentials,
  ShopperExist,
  VerifyEmail,
} from '../../../api/userAPI';
import { Button, InputContainer } from '../../../shared';
import { setEmail, setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import { setAnyAction } from '../../../store/reducers/helper';
import { setPreferredCard } from '../../../store/reducers/transaction';
import CardDetails from './cardDetails';
import Otp from './otp';
import { PayForm, PaySection, InfoBox, Icon, Row, Col } from './payStyles';
import Pin from './pin';
import Redirect from './redirect';
import Success from './success';

function Pay(props) {
  const dispatch = useDispatch();
  let toastMsg = '';
  const [loading, setLoading] = useState(false); //Use circular loading indicator
  const [isMailValidated, setIsMailValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
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
      SaveLoginCredentials(
        JSON.stringify({ ...userInfo, token: sendReq.token }),
      );
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(sendReq.user));
      let cardReq = await FetchCards((showFew = true));
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      }
    } else {
      toastMsg = sendReq.message;
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
      //TODO - Open Pay anyone 8 -success
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

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  function resetBox() {
    setMode('');
    dispatch(setEmail());
    dispatch(setAnyAction());
    return;
  }

  if ((mode = 'CARD_DETAILS'))
    return (
      <CardDetails
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //CARD DETAILS UI

  if ((mode = 'VERIFY_EMAIL'))
    return (
      <CardDetails
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //VERIFY EMAIL

  if ((mode = 'VERIFY_EMAIL_NEXT'))
    return (
      <CardDetails
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
      <Success
        mode={mode}
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        resetBox={resetBox}
      />
    ); //SUCCESS UI

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
          id={'amount-to-pay'}
          type={'email'}
          placeholder={'receivermail@gmail.com'}
        />

        {isLoggedIn ? (
          {
            /*TODO - Show user.avatar, user.firstname, user.lastname*/
          }
        ) : (
          <InputContainer
            legend={`Your mail`}
            id={'your-mail'}
            type={'email'}
            placeholder={'youremail@gmail.com'}
          />
        )}

        {isMailValidated ? (
          <InfoBox>
            <Icon className="fa-solid fa-circle-info"></Icon>
            {form?.email}
          </InfoBox>
        ) : (
          //TODO -Add buton "Not you", to reset isMailValidated to false
          <InfoBox>
            <Icon className="fa-solid fa-circle-info"></Icon>
            Use your Slashit email address if you have a Slashit account
          </InfoBox>
        )}
      </PaySection>

      <PaySection>
        <Row>
          <div>How you’ll pay</div>
          <div>
            4 x installments <i className="fa-solid fa-caret-down"></i>
          </div>
        </Row>

        {/* {TODO - If preferredCard, show Charged to card number and expiry here} */}

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
