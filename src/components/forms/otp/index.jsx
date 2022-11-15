import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  FetchUserById,
  SaveLoginCredentials,
  VerifyEmail,
} from '../../../api/userAPI';
import { OtpInputContainer } from '../../../shared';
import { setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import {
  FormContainer,
  Wrapper,
  Column,
  Content,
  StyledTitle,
  A,
} from '../formStyles';

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

function OtpForm() {
  let toastMsg = '';
  const dispatch = useDispatch();
  const [otpData, setOtpData] = useState(['']);
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const [showToast, setShowToast] = useState(false);

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
    let sendReq = await VerifyEmail(
      signUpInfo.email,
      //TODO -Declare otp here,
      false,
      computerInfo,
      (platform = 'web'),
    );
    if (sendReq.success) {
      SaveLoginCredentials(JSON.stringify({ token: sendReq.token }));
      const userReq = await FetchUserById();
      if (userReq.success) {
        dispatch(setUser(userReq.user));
      }
      dispatch(setIsLoggedIn(true));
      //TODO - Link to "Sign up 11" Preparing your brand new dashboard
    } else {
      toastMsg = sendReq.message;
    }
    setLoading(false);
  }

  useEffect(() => {
    if (otpData.length === 0) {
      document.getElementById(`otp_digit_0`).focus();
    }
    //Verify Code
    if (otpData.length === 4) {
    }
  }, [otpData]);

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Enter the code sent to your email</StyledTitle>

        <Column>
          <Content id="otp_digit_group">
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
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default OtpForm;
