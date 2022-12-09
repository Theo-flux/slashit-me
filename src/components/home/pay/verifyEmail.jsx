import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserById, VerifyEmail } from '../../../api/userAPI';
import { FetchCards, PayAnyone } from '../../../api/transactionAPI';
import statusCode from '../../../api/statusCode';
import { setPreferredCard } from '../../../store/reducers/transaction';
import { setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import { useLocalStorage, useToast } from '../../../hooks';
import { SuccessContainer, Inner, Message } from './success';
import { StyledTitle, Content } from '../../forms/formStyles';
import { OtpInputContainer } from '../../../shared';

const otp_item = [
  {
    id: 'otp_digit_0',
    name: 'otp_digit_0',
  },

  {
    id: 'otp_digit_1',
    name: 'otp_digit_1',
  },

  {
    id: 'otp_digit_2',
    name: 'otp_digit_2',
  },

  {
    id: 'otp_digit_3',
    name: 'otp_digit_3',
  },

  {
    id: 'otp_digit_4',
    name: 'otp_digit_4',
  },

  {
    id: 'otp_digit_5',
    name: 'otp_digit_5',
  },
];

function EnterEmailCode(props) {
  let toastMsg = '';
  const dispatch = useDispatch();
  const router = useRouter();
  const [otpData, setOtpData] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [toastOptions, toast] = useToast();
  const { sessionInfo } = useLocalStorage();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);

  function handleOtpOnChange(event, index) {
    const { value } = event.target;

    setOtpData((otpStr) => {
      otpStr[index] = value;
      return otpStr;
    });

    if (value) {
      if (index < 5) {
        document.getElementById(`otp_digit_${index + 1}`).focus();
      } else {
        document.getElementById(`otp_digit_${index}`).focus();
      }
    }

    if (!otpData[index]) {
      event.target.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          document.getElementById(`otp_digit_${index - 1}`)?.focus();
        }
        event.target.value = '';
      });
    }
  }

  async function verify() {
    setLoading(true);
    let sendReq = await VerifyEmail(
      props.email,
      otp,
      props?.any ? true : false,
      computerInfo,
      (platform = 'web'),
    );
    if (sendReq.success) {
      let userInfo = sessionInfo.userInfo;
      setSession({ userInfo, token: sendReq.token, session: true });

      const userReq = await FetchUserById();
      if (userReq.success) {
        dispatch(setUser(userReq.user));
      }
      let cardReq = await FetchCards(true);
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      } else {
        props.setMode('');
      }
    } else {
      toast({ text: sendReq.message, textColor: '#fff' });
    }
    setLoading(false);
  }

  return (
    <SuccessContainer>
      <Inner>
        <StyledTitle>Enter the 6 digit code sent to your email</StyledTitle>

        <Content>
          {otp_item.map((otp_item, index) => {
            return (
              <OtpInputContainer
                key={index}
                id={otp_item.id}
                name={otp_item.name}
                onChange={(e) => handleOtpOnChange(e, index)}
              />
            );
          })}
        </Content>
      </Inner>
    </SuccessContainer>
  );
}

export default EnterEmailCode;
