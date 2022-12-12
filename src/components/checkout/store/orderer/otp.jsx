import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content } from '../../../forms/formStyles';
import { OtpInputContainer } from '../../../../shared';
import { EnvelopeCover, ProcessContent, Text } from '../storeStyle';
import { setOtp } from '../../../../store/reducers/helper';
import { useDispatch, useSelector } from 'react-redux';

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

const StyledText = styled(Text)`
  text-align: center;
  font-weight: 600;
`;

function VerifyEmail() {
  const dispatch = useDispatch();
  const [otpData, setOtpData] = useState(['']);
  const otp = useSelector((state) => state.helper.otp);
  function handleOtpOnChange(event, index) {
    const { value } = event.target;

    setOtpData((otpStr) => {
      otpStr[index] = value;
      dispatch(setOtp(value));
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

  useEffect(() => {}, [otpData]);

  console.log(otpData, otp);

  return (
    <ProcessContent>
      <EnvelopeCover>
        <StyledText>Enter the code sent to your email to continue</StyledText>
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
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default VerifyEmail;
